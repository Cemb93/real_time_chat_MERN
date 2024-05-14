import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext"
import { ISessionUser } from "../../interface";
import { AuthContext } from "../../context/AuthContext";

export const PotentialChat = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);
  // console.log("potentialChats:", potentialChats)
  return (
    <div className="d-flex justify-content-start">
      {
        !potentialChats.length ? null : (
          potentialChats.map(function(el: ISessionUser) {
            // console.log("el:", el)
            if (user._id !== el._id) {
              return (
                <div 
                  key={el._id} 
                  onClick={function() {
                    createChat(user._id, el._id);
                  }}
                >
                  <p><strong>Nombre: </strong>{el.name}</p>
                  <span
                    className={
                      onlineUsers.some(function(online) {
                        return online.userId === el._id;
                      }) ? "user-online" : ""
                    }
                  ></span>
                </div>
              );
            }
          })
        )
      }
    </div>
  )
}
