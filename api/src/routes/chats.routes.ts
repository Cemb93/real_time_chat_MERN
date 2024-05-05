import { Router } from "express";
import { createChat } from "../services/chats/post";
import { findChat, findUserChats } from "../services/chats/get";

export const chatsRouter = Router();

const CHAT = "chat"

chatsRouter.post(`/${CHAT}`, createChat);
chatsRouter.get(`/${CHAT}/:id`, findUserChats);
chatsRouter.get(`/${CHAT}/find/:firstId/:secondId`, findChat);