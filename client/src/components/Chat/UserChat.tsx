import { Stack } from "react-bootstrap";
import { useFetchRecipient } from "../../hooks/useFetchRecipient";
import { IChats, ISessionUser } from "../../interface";

export const UserChat = (
  {chat, user}:
  {chat: IChats, user: ISessionUser}
) => {
  // console.log("chat:", chat)
  const recipentUser = useFetchRecipient(chat, user);
  // console.log("recipentUser:", recipentUser)
  return (
    <Stack
      direction="horizontal"
      gap={3}
    >
      <div>IMG</div>
      <p>{recipentUser && recipentUser.name}</p>
      <div>TEXT MESSAGES</div>
      <div>FECHA</div>
      <div>NOTIFICACION O MENSAJES</div>
    </Stack>
  )
}
