import { model, Schema } from "mongoose";
import { IUsers } from "../interface/IUsers";

export const usersModel = model<IUsers>("user", new Schema<IUsers>({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
}, {
  versionKey: false,
  timestamps: false,
}));
