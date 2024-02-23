import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation) => {
        return <Conversation key={conversation._id} user={conversation} />;
      })}
    </div>
  );
};
export default Conversations;
