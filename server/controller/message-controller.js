import Message from "../model/Message.js";
import Conversation from "../model/Conversation.js";

export const newMessage = async (request, response) => {
  try {
    const newMessage = new Message({
      senderId: request.body.senderId,
      receiverId: request.body.receiverId,
      conversationId: request.body.conversationId,
      type: request.body.type,
      text: request.body.text,  // just plain text
    });

    await newMessage.save()
    await Conversation.findByIdAndUpdate(request.body.conversationId, {
      message: request.body.text,
    });

    return response.status(200).json("Message has been sent sucessfully");
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const getMessages = async (request, response) => {
  try {
    const messages = await Message.find({ conversationId: request.params.id });
    response.status(200).json(messages);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};
