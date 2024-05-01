import { Request, Response } from "express";
import { usersModel } from "../../models/Users";
import { IUsers } from "../../interface/IUsers";

export async function getAllUsers(_: Request, res: Response) {
  try {
    const allUsers: IUsers[] = await usersModel.find({});

    if (!allUsers.length) {
      throw new Error("No hay usuarios registrados");
    } else {
      return res.status(200).json(allUsers);
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ error: error.message, });
    }
    return res.status(400).json({ error: "Error en getElementsGym por:" + error, });
  }
}