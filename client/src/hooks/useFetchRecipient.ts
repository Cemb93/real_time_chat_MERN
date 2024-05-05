import { useEffect, useState } from "react";
import { BACK_END_URL, getRequest } from "./services";

export function useFetchRecipient(chat: any, user: any) {
  const [recipentUser, setRecipentUser] = useState<Record<string, string>>({});
  const recipientId = chat.members.find(function(id: any) {
    id !== user._id;
  });

  useEffect(function() {
    async function getUser() {
      const response = await getRequest(`${BACK_END_URL}/find/${recipientId}`);
      setRecipentUser(response)
    }
    getUser();
  }, []);

  return recipentUser;
}