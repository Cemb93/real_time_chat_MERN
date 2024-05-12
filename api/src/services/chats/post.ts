import { Request, Response } from "express";
import { IChats } from "../../interface/IChats";
import { chatsModel } from "../../models/Chats";

export async function createChat(req: Request, res: Response) {
  const chat = req.body as IChats;
  console.log("chat:", chat)

  try {
    /* 
      ? firstId = ID DEL USUARIO UNO
      * firstId = ID DEL USUARIO DOS
    */
    const existChat: IChats | null = await chatsModel.findOne({
      members: {
        $all: [chat.firstId, chat.secondId],
      }
    });

    if (existChat) {
      return res.status(200).json(existChat);
    }

    const newChat: IChats = await chatsModel.create({
      members: [chat.firstId, chat.secondId],
    });

    return res.status(200).json(newChat);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ error: error.message, });
    }
    return res.status(500).json({ error: "Error en createChat por:" + error, });
  }
}