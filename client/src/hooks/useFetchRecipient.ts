import { useEffect, useState } from "react";
import { BACK_END_URL, getRequest } from "./services";
import { IChats, ISessionUser } from "../interface";

export function useFetchRecipient(chat: IChats, user: ISessionUser) {
  // console.log("chat:", chat.members)
  const [recipentUser, setRecipentUser] = useState<ISessionUser | null>(null);
  const recipientId = chat.members && chat.members.find(function(id: string) {
    return id !== user.id;
  });
  // console.log("recipientId:", recipientId)

  useEffect(function() {
    async function getUser() {
      if (!recipientId) return null;
      const response: ISessionUser = await getRequest(`${BACK_END_URL}/users/${recipientId}`);
      // console.log("response:", response)
      setRecipentUser(response)
    }
    getUser();
  }, []);

  return recipentUser;
}