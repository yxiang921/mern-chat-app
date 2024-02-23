import { useEffect, useRef } from "react";

import useGetMessage from "../../hooks/useGetMessage";
import useListenMessages from "../../hooks/useListenMessages";
import Message from "./Message";

const Messages = () => {
  useListenMessages();
  const { messages } = useGetMessage();

  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages.length > 0 ? (
        messages.map((message) => {
          return (
            <div key={message._id} ref={lastMessageRef}>
              <Message message={message} />
            </div>
          );
        })
      ) : (
        <h3 className="text-white flex justify-center items-center">
          No Messages Found
        </h3>
      )}
    </div>
  );
};
export default Messages;
