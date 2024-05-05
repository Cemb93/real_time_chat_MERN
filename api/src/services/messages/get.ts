import { Request, Response } from "express";
import { messagesModel } from "../../models/Messages";
import { IMessages } from "../../interface/IMessages";

export async function getMessages(req: Request, res: Response) {
  const { chatId } = req.params;
  // console.log("chatId:", chatId)
  
  try {
    const allMessage: IMessages[] = await messagesModel.find();
    const filterMessage = allMessage.filter(function(el: IMessages) {
      return el.chatId === chatId;
    });
    // console.log("filterMessage:", filterMessage)

    return res.status(200).json(filterMessage);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ error: error.message, });
    }
    return res.status(500).json({ error: "Error en getMessages por:" + error, });
  }
}