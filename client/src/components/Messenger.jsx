import { useContext } from "react";

import { AppBar, Box, Toolbar, styled } from "@mui/material";

import { AccountContext } from "../context/AccountProvider";

import LoginDialog from "./account/LoginDialog";
import ChatDiaglog from "./chat/ChatDiaglog";

const Component = styled(Box)`
  height: 100vh;
  background-color: #dcdcdc;
`;

const Header = styled(AppBar)`
  height: 125px;
  background-color: #00A884;
  box-shadow: none;
`;

const LoginHeader = styled(AppBar)`
  height: 220px;
  background-color: #00bfa5;
  box-shadow: none;
`;

const Messenger = () => {
  const { account } = useContext(AccountContext);

  return (
    <Component>
      {account ? 
        <>
          <Header>
            <Toolbar></Toolbar>
          </Header>
          <ChatDiaglog />
        </>
       : 
        <>
          <LoginHeader>
            <Toolbar></Toolbar>
          </LoginHeader>
          <LoginDialog />
        </>
      }
    </Component>
  );
};

export default Messenger;
