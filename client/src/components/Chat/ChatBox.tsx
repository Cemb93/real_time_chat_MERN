import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipient } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import InputEmoji from "react-input-emoji";

export const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChats, messages, sendTextMessage } = useContext(ChatContext);
  const recipentUser = useFetchRecipient(currentChats, user);
  const [textMessage, setTextMessage] = useState<string>("");
  // console.log("textMessage:", textMessage)
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
      <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          fontFamily="nunito"
          borderColor="rgba(72, 112, 223, 0.2)" 
          shouldReturn={false} 
          shouldConvertEmojiToImage={false} 
        />
      </Stack>
      <button 
        className="send-btn"
        onClick={function() {
          if (!currentChats._id) return;
          sendTextMessage(textMessage, user, currentChats._id, setTextMessage);
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          fill="currentColor" 
          className="bi bi-send-fill" 
          viewBox="0 0 16 16"
        >
          <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
        </svg>
      </button>
    </Stack>
  )
}
