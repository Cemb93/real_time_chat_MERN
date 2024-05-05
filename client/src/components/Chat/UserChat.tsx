import { useFetchRecipient } from "../../hooks/useFetchRecipient";

export const UserChat = (props: any) => {
  console.log("props:", props)
  const recipentUser = useFetchRecipient(props.chat, props.user);
  console.log("recipentUser:", recipentUser)
  return (
    <div>
      <p>{recipentUser.name}</p>
    </div>
  )
}
