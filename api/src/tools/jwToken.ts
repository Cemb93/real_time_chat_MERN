import Jwt from "jsonwebtoken"
const { TOKEN } = process.env;

export const generarToken = async (id: string): Promise<string> => {
  return Jwt.sign({ id }, TOKEN as string, { expiresIn: "3h", });
}