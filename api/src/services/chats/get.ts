import { Request, Response } from "express";
import { chatsModel } from "../../models/Chats";
import { IChats } from "../../interface/IChats";

export async function findUserChats(req: Request, res: Response) {
  const { id } = req.params;
  
  try {
    const chats: IChats[] = await chatsModel.find({
      members: {
        $in: [id],
      }
    });

    return res.status(200).json(chats);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ error: error.message, });
    }
    return res.status(500).json({ error: "Error en findUserChats por:" + error, });
  }
}

export async function findChat(req: Request, res: Response) {
  const { firstId, secondId } = req.params;
  
  try {
    const chat: IChats | null = await chatsModel.findOne({
      members: {
        $all: [firstId, secondId],
      }
    });

    return res.status(200).json(chat);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ error: error.message, });
    }
    return res.status(500).json({ error: "Error en findUserChats por:" + error, });
  }
}