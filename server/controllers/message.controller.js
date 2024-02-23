import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketID, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverID } = req.params;
    const senderID = req.user._id;

    let conversation = await Conversation.findOne({
      particapants: {
        $all: [senderID, receiverID],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        particapants: [senderID, receiverID],
      });
    }

    const newMessage = new Message({
      senderID,
      receiverID,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    // Socket IO
    const receiverSokcetID = getReceiverSocketID(receiverID);
    if (receiverSokcetID) {
      io.to(receiverSokcetID).emit("newMessage", newMessage);
    }

    res.json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller", error.message);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatID } = req.params;
    const senderID = req.user._id;

    const conversation = await Conversation.findOne({
      particapants: { $all: [senderID, userToChatID] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json({ error: "No Message Found" });
    }

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessage controller", error.message);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
