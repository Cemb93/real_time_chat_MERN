import { Request, Response } from "express";
import { usersModel } from "../../models/Users";
import { IUsers } from "../../interface/IUsers";

export async function detail(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const findUser: IUsers | null = await usersModel.findById(id);

    if (findUser) {
      return res.status(200).json(findUser);
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    console.log("Error en detail por:", error);
  }
}