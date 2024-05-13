import Jwt from "jsonwebtoken"
const { TOKEN } = process.env;

export const generarToken = async (_id: string): Promise<string> => {
  return Jwt.sign({ _id }, TOKEN as string, { expiresIn: "3h", });
}