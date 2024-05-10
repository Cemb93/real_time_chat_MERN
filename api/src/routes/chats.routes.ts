import { Router } from "express";
import { createChat } from "../services/chats/post";
import { findChat, findUserChats } from "../services/chats/get";

export const chatsRouter = Router();

const CHAT = "chats"

chatsRouter.post(`/${CHAT}`, createChat);
chatsRouter.get(`/${CHAT}/:userId`, findUserChats);
chatsRouter.get(`/${CHAT}/find/:firstId/:secondId`, findChat);