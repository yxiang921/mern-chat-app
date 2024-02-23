import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderID === authUser._id;
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;

  const chatClassName = fromMe
    ? "chat-end flex-row-reverse"
    : "chat-start flex-row";

  return (
    <div className={`chat flex justify-start items-center ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={profilePic}
            alt={fromMe ? authUser.username : selectedConversation.username}
          />
        </div>
      </div>
      <div
        className={`chat-bubble text-white pb-2 ${fromMe ? "bg-sky-500" : ""}`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
        {message.createdAt.slice(0, 10)} {message.createdAt.slice(11, 19)}
      </div>
    </div>
  );
};
export default Message;
