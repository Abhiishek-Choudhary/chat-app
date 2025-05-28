import { useContext, useState, useEffect, useRef } from "react";

import { Box, styled } from "@mui/material";

import { AccountContext } from "../../context/AccountProvider";

import { newMessage, getMessages } from "../../service/api";

//components
import Footer from "./Footer";
import Message from "./Message";

const Wrapper = styled(Box)`
  background-image: url(${"https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"});
  background-size: 50%;
`;

const Container = styled(Box)`
  padding: 2px 80px;
`;

const Component = styled(Box)`
  height: 78vh;
  overflow-y: scroll;
`;

const Messages = ({ person, conversation }) => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const [incomingMessage, setIncomingMessage] = useState(null);

  const scrollRef = useRef();

  const { account, socket, newMessageFlag, setNewMessageFlag } =
    useContext(AccountContext);

  useEffect(() => {
    const handleMessage = (data) => {
      setIncomingMessage({ ...data, createdAt: Date.now() });
    };
    socket.current.on("getMessage", handleMessage);
    return () => socket.current.off("getMessage", handleMessage);
  }, []);

  useEffect(() => {
    incomingMessage &&
      conversation?.members?.includes(incomingMessage.senderId) &&
      setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage, conversation]);

  useEffect(() => {
    const getMessageDetails = async () => {
      if (conversation && conversation._id) {
        const data = await getMessages(conversation._id);
        setMessages(data || []);
      }
    };

    getMessageDetails();
  }, [person._id, conversation?._id, newMessageFlag]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendText = async (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      if (!file && !value.trim()) return; // Prevent empty sends
      let message = file
        ? {
            senderId: account.sub,
            receiverId: person.sub,
            conversationId: conversation._id,
            type: "file",
            text: image,
          }
        : {
            senderId: account.sub,
            receiverId: person.sub,
            conversationId: conversation._id,
            type: "text",
            text: value,
          };

      socket.current.emit("sendMessage", message);
      await newMessage(message);

      setValue("");
      setFile(null);
      setImage("");
      setNewMessageFlag((prev) => !prev);
    }
  };

  return (
    <Wrapper>
      <Component>
        {messages &&
          messages.map((message, index) => (
            <Container
              key={message._id || message.createdAt}
              ref={index === messages.length - 1 ? scrollRef : null}
            >
              <Message message={message} />
            </Container>
          ))}
      </Component>
      <Footer
        sendText={sendText}
        setValue={setValue}
        value={value}
        file={file}
        setFile={setFile}
        setImage={setImage}
      />
    </Wrapper>
  );
};

export default Messages;
