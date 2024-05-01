import { Request, Response } from "express";
import { IUsers } from "../../interface/IUsers";
import { usersModel } from "../../models/Users";
import { passwordHashado } from "../../tools/bcrypt";
import { generarToken } from "../../tools/jwToken";

export async function register(req: Request, res: Response) {
  const user = req.body as IUsers;

  try {
    const existUser: IUsers | null = await usersModel.findOne({
      email: user.email,
    });
  
    if (existUser) {
      return res.status(400).json({
        error: "El usuario con el correo ya existe",
      });
    }

    if (!user.email || !user.name || !user.password) {
      return res.status(400).json({
        error: "Todos los campos son requeridos",
      });
    }
  
    const encriptado = await passwordHashado(user.password);

    const newUser: IUsers = await usersModel.create({
      name: user.name,
      email: user.email,
      password: encriptado,
    });

    if (newUser) {
      const token = await generarToken(newUser.email);
      return res.status(201).json({
        message: "OK",
        newUser,
        token,
      });
    }

  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    console.log("Error en register por:", error);
  }
}