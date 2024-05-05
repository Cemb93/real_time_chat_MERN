import { useContext } from "react"
import { ChatContext } from "../context/ChatContext"
import { UserChat } from "../components/Chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import { PotentialChat } from "../components/Chat/PotentialChat";

export const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats } = useContext(ChatContext);
  console.log("userChats:", userChats)
  return (
    <div>
      <PotentialChat />
      {
        userChats?.map(function(chat, index) {
          return (
            <div key={index}>
              <UserChat chat={chat} user={user} />
            </div>
          );
        })
      }
    </div>
  )
}
