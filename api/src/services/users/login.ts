import { Request, Response } from "express";
import { IUsers } from "../../interface/IUsers";
import { usersModel } from "../../models/Users";
import { passwordCorrecto } from "../../tools/bcrypt";
import { generarToken } from "../../tools/jwToken";

export async function login(req: Request, res: Response) {
  const user = req.body as IUsers;

  try {
    const existUser: IUsers | null = await usersModel.findOne({
      email: user.email,
    });

    if (!existUser) {
      return res.status(401).json({
        error: "Esta cuenta no esta registrada",
      });
    }

    if (!user.email || !user.password) {
      return res.status(400).json({
        error: "Todos los campos son requeridos",
      });
    }

    const passwordEncriptado = existUser.password;

    const compararPassword = await passwordCorrecto(
      user.password,
      passwordEncriptado
    );

    if (compararPassword) {
      const token = await generarToken(existUser.email);

      const data = {
        _id: existUser._id,
        name: existUser.name,
        email: existUser.email,
        token: token,
      };

      return res.status(200).json(data);
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    console.log("Error en register por:", error);
  }
}
