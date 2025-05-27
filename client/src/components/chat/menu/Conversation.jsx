import { useContext, useEffect, useState } from "react";

import { Box, Typography, styled } from "@mui/material";
import { AccountContext } from "../../../context/AccountProvider";
import { setConversation, getConversation } from "../../../service/api";
import { formatDate } from "../../../utils/common-utils";

const Component = styled(Box)`
  display: flex;
  height: 45px;
  padding: 13px 0;
  cursor: pointer;
`;

const Image = styled("img")({
  width: 50,
  height: 50,
  borderRadius: "50%",
  padding: "0 14px",
  objectFit: "cover",
});

const Container = styled(Box)`
  display: flex;
  width: 100%;
`;

const RightContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 20px;
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const Name = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
`;

const TimeStamp = styled(Typography)`
  font-size: 12px;
  color: #878787;
`;

const Text = styled(Typography)`
  font-size: 14px;
  color: #878787;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 250px;
`;

const Conversation = ({ user }) => {
  const { SetPerson, account, newMessageFlag } = useContext(AccountContext);

  const [message, setMessage] = useState({});

  useEffect(() => {
    const getConversationDetails = async () => {
      const data = await getConversation({
        senderId: account.sub,
        receiverId: user.sub,
      });
      setMessage({ text: data?.message, timestamp: data?.updatedAt });
    };
    getConversationDetails();
  }, [newMessageFlag]);

  const getUser = async () => {
    SetPerson(user);
    await setConversation({ senderId: account.sub, receiverId: user.sub });
  };

  return (
    <Component onClick={getUser}>
      <Image src={user.picture} alt="Profile" />
      <Container>
        <RightContainer>
          <Header>
            <Name>{user.name}</Name>
            {message?.text && (
              <TimeStamp>{formatDate(message.timestamp)}</TimeStamp>
            )}
          </Header>
          <Text>
            {message?.text?.includes("localhost") ? "media" : message.text}
          </Text>
        </RightContainer>
      </Container>
    </Component>
  );
};

export default Conversation;
