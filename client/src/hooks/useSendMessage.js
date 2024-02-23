import React, { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { selectedConversation, setMessages, messages } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await fetch(`api/message/sendMessage/${selectedConversation._id}`, {
        method: "POST",
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify({message}),
      });

      const result = await res.json();
      setMessages([...messages, result]);
      if(result.error){
        throw new Error(result.error);
      }
    } catch (error) {
        toast.error(error.message);
    }finally{
        setLoading(false);
    }
  };

  return {loading, sendMessage}
};

export default useSendMessage;
