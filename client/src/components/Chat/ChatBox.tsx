import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipient } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";

export const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChats, messages } = useContext(ChatContext);
  const recipentUser = useFetchRecipient(currentChats, user);
  if (!recipentUser) {
    return (
      <p style={{textAlign: 'center', width: '100%'}}>
        No hay messages
      </p>
    );
  }
  return (
    <Stack gap={4} className="chat-box">
      <div className="chat-header">
        <strong>{recipentUser.name}</strong>
      </div>
      <Stack gap={3} className="messages">
        {
          messages.length && messages.map(function(message) {
            return (
              <div 
                key={message._id}
                className={`${
                  message.senderId === user._id ? (
                    "message self align-self-end flex-grow-0"
                  ) : (
                    "message align-self-start flex-grow-0"
                  )
                }`}
              >
                <span>{message.text}</span>
                <br />
                <span className="message-footer">{!message.createdAt ? "sin fecha" : message.createdAt}</span>
              </div>
            );
          })
        }
      </Stack>
    </Stack>
  )
}
