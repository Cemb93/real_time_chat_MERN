import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext"
import { ISessionUser } from "../../interface";
import { AuthContext } from "../../context/AuthContext";

export const PotentialChat = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat } = useContext(ChatContext);
  // console.log("potentialChats:", potentialChats)
  return (
    <div className="d-flex justify-content-start">
      {
        !potentialChats.length ? null : (
          potentialChats.map(function(el: ISessionUser) {
            return (
              <div 
                key={el.id} 
                onClick={function() {
                  createChat(user.id, el.id);
                }}
              >
                <p><strong>Nombre: </strong>{el.name}</p>
              </div>
            );
          })
        )
      }
    </div>
  )
}
