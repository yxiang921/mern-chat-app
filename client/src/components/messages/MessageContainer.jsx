import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
  const { selectedConversation } = useConversation();
  return (
    <div className="md:min-w-[450px] flex flex-col">
      <>
        {/* Header */}
        <div className="px-4 py-2 mb-2 bg-sky-500 flex flex-row items-center">
          {selectedConversation ? (
            <>
              <span className="label-text font-extrabold">To:</span>
              <span className="text-white font-medium pl-2">
                {selectedConversation.username}
              </span>
            </>
          ) : (
            "No Conversation Selected"
          )}
        </div>

        <Messages />
        <MessageInput />
      </>
    </div>
  );
};
export default MessageContainer;
