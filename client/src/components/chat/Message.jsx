import { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider";

import { iconPDF } from "../../constants/data";
import { formatDate, downloadMedia } from "../../utils/common-utils";
import { Box, Typography, styled } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";

const Own = styled(Box)`
  background: #dcf8c6;
  max-width: 60%;
  margin-left: auto;
  padding: 5px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
`;

const Wrapper = styled(Box)`
  background: #ffffff;
  max-width: 60%;
  padding: 5px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
`;

const Text = styled(Typography)`
  font-size: 14px;
  padding: 0 15px 0 5px;
`;

const Time = styled(Typography)`
  font-size: 10px;
  color: #919191;
  /* margin-top: 6px; */
  word-break: keep-all;
  margin-top: auto;
`;

export const Message = ({ message }) => {
  const { account } = useContext(AccountContext);

  if (!message || !message.senderId) return null;

  return (
    <>
      {account.sub === message.senderId ? (
        <Own>
          {message.type === "file" ? (
            <ImageMessage message={message} />
          ) : (
            <TextMessage message={message} />
          )}
        </Own>
      ) : (
        <Wrapper>
          {message.type === "file" ? (
            <ImageMessage message={message} />
          ) : (
            <TextMessage message={message} />
          )}
        </Wrapper>
      )}
    </>
  );
};

const ImageMessage = ({ message }) => {
  if (!message.text) return <Typography color="error">File info unavailable</Typography>;

  return (
    <Box style={{ position: "relative" }}>
      {message.text.includes(".pdf") ? (
        <Box style={{ display: "flex" }}>
          <img src={iconPDF} alt="pdf" style={{ width: "80px" }} />
          <Typography style={{ fontSize: "14px" }}>
            {message.text.split("/").pop()}
          </Typography>
        </Box>
      ) : (
        <img
          style={{ width: 300, height: "100%", objectFit: "cover" }}
          src={message.text}
          alt="Uploaded file"
        />
      )}
      <Time style={{ position: "absolute", bottom: 0, right: 0 }}>
        <GetAppIcon
          onClick={(e) => downloadMedia(e, message.text)}
          style={{
            marginRight: 10,
            border: "1px solid grey",
            borderRadius: "50%",
            fontSize: "small",
          }}
        />
        {message.createdAt ? formatDate(message.createdAt) : ""}
      </Time>
    </Box>
  );
};



const TextMessage = ({ message }) => {
  return (
    <>
      <Text>{message.text}</Text>
      <Time>{formatDate(message.createdAt)}</Time>
    </>
  );
};

export default Message;
