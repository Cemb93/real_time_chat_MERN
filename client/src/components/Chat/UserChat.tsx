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
      className="d-flex align-items-center p-2 justify-content-center"
    >
      <div>
        <p>IMG</p>
        <div className="d-flex justify-content-between">
          <p>{recipentUser && recipentUser.name}</p>
          <p>TEXT MESSAGES</p>
        </div>
        <p>FECHA</p>
        <p>NOTIFICACION O MENSAJES</p>
      </div>
    </Stack>
  )
}
