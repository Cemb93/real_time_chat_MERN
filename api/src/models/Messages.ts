import { model, Schema } from "mongoose";
import { IMessages } from "../interface/IMessages";

export const messagesModel = model<IMessages>("message", new Schema<IMessages>({
  chatId: {
    type: String,
  },
  senderId: {
    type: String,
  },
  text: {
    type: String,
  },
}, {
  versionKey: false,
  timestamps: false,
}));
