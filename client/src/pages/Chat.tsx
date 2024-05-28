import { useContext } from "react"
import { ChatContext } from "../context/ChatContext"
import { UserChat } from "../components/Chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import { PotentialChat } from "../components/Chat/PotentialChat";
import { Container, Stack } from "react-bootstrap";
import { ChatBox } from "../components/Chat/ChatBox";

export const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, updateCurrentChat } = useContext(ChatContext);
  // console.log("userChats:", userChats)
  return (
    <div>
      <Container>
        <PotentialChat />
        {
          !user._id && userChats.length === 0 ? null : (
            <div>
              <Stack
                direction="horizontal"
                gap={4}
                className="align-items-start"
              >
                <Stack className="messages-box flexgrow-0">
                  {
                    userChats?.map(function(chat) {
                      // console.log("userChats:", userChats)
                      return (
                        <div key={chat._id} onClick={function() {
                          updateCurrentChat(chat)
                        }}>
                          <UserChat chat={chat} user={user} />
                        </div>
                      );
                    })
                  }
                </Stack>
                <ChatBox />
              </Stack>
            </div>
          )
        }
      </Container>
      {/* <PotentialChat /> */}
    </div>
  )
}
