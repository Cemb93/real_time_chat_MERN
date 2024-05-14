import { Request, Response } from "express";
import { messagesModel } from "../../models/Messages";
import { IMessages } from "../../interface/IMessages";
import { formatDate } from "../../tools/formatDate";

export async function getMessages(req: Request, res: Response) {
  const { chatId } = req.params;
  // console.log("chatId:", chatId)

  try {
    const allMessage: IMessages[] = await messagesModel.find();
    const filterMessage = allMessage.filter((message: IMessages) => {
      return message.chatId === chatId;
    }).map((message: IMessages) => {
      return {
        _id: message._id,
        chatId: message.chatId,
        senderId: message.senderId,
        text: message.text,
        createdAt: formatDate(message.createdAt),
      }
    });
    // console.log("filterMessage:", filterMessage);

    return res.status(200).json(filterMessage);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: "Error en getMessages por:" + error });
  }
}
