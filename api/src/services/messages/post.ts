import { Request, Response } from "express";
import { IMessages } from "../../interface/IMessages";
import { messagesModel } from "../../models/Messages";

export async function createMessage(req: Request, res: Response) {
  const message = req.body as IMessages;

  try {
    /* 
      ? DE LA SIGUIENTE RUTA = http://localhost:3001/chats/find/:firstId/:secondId
      * SE OBTIENE EL "_id", Y SE USA PARA "chatId"
    */
    const newMessage: IMessages = await messagesModel.create({
      chatId: message.chatId,
      senderId: message.senderId,
      text: message.text
    });

    return res.status(200).json(newMessage);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ error: error.message, });
    }
    return res.status(500).json({ error: "Error en createMessage por:" + error, });
  }
}