import { useEffect, useState, useContext } from "react";

import { Box, styled, Divider } from "@mui/material";

import { getUsers } from "../../../service/api";

import { AccountContext } from "../../../context/AccountProvider";

import Conversation from "./Conversation";

const Component = styled(Box)`
  height: 81vh;
  overflow: overlay;
`;

const StyledDivider = styled(Divider)`
  margin: 0 0 0 70px;
  background: #e9edef;
  opacity: 0.6;
`;

const Conversations = ({ text }) => {
  const [users, setUsers] = useState([]);

  const { account, socket, setActiveUsers } = useContext(AccountContext);

  useEffect(() => {
    const fetchData = async () => {
      let response = await getUsers();
      const filterData = response.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );
      setUsers(filterData);
    };
    fetchData();
  }, [text]);

  useEffect(() => {
    socket.current.emit("addUsers", account);
    socket.current.on("getUsers", (users) => {
      setActiveUsers(users);
    });

    // Cleanup socket listener on unmount or account change
    return () => {
      socket.current.off("getUsers");
    };
  }, [account, socket]);

  return (
    <Component>
      {users.length === 0 ? (
        <Box>No users found.</Box>
      ) : (
        users.map(user =>
          user.sub !== account.sub && (
            <Box key={user.sub}>
              <Conversation user={user} />
              <StyledDivider />
            </Box>
          )
        )
      )}
    </Component>
  );
};

export default Conversations;
