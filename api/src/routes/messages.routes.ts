import { Router } from "express";
import { createMessage } from "../services/messages/post";
import { getMessages } from "../services/messages/get";

export const messagesRouter = Router();

const MESSAGE = "messages"

messagesRouter.post(`/${MESSAGE}`, createMessage);
messagesRouter.get(`/${MESSAGE}/:chatId`, getMessages);