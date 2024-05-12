import { useContext } from "react"
import { ChatContext } from "../context/ChatContext"
import { UserChat } from "../components/Chat/UserChat";
import { AuthContext } from "../context/AuthContext";
import { PotentialChat } from "../components/Chat/PotentialChat";
import { Container, Stack } from "react-bootstrap";

export const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats } = useContext(ChatContext);
  // console.log("userChats:", userChats)
  return (
    <div>
      <Container>
        <PotentialChat />
        {
          userChats.length === 0 ? null : (
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
                        <div key={chat._id}>
                          <UserChat chat={chat} user={user} />
                        </div>
                      );
                    })
                  }
                </Stack>
                <p>CHAT - BOX</p>
              </Stack>
            </div>
          )
        }
      </Container>
      {/* <PotentialChat /> */}
    </div>
  )
}
