import { model, Schema } from "mongoose";
import { IChats } from "../interface/IChats";

export const chatsModel = model<IChats>("chat", new Schema<IChats>({
  members: {
    type: Array,
  },
}, {
  versionKey: false,
  timestamps: false,
}));
