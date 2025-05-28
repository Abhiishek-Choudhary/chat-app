import { useContext, useState } from "react";

import { Box, styled } from "@mui/material";
import { Chat as MessageIcon } from "@mui/icons-material";

import { AccountContext } from "../../../context/AccountProvider";

//components
import HeaderMenu from "./HeaderMenu";
import InfoDrawer from "../../drawer/InfoDrawer";

const Component = styled(Box)`
  height: 44px;
  background-color: #ededed;
  padding: 8px 16px;
  display: flex;
  align-items: center;
`;

const Wrapper = styled(Box)`
  margin-left: auto;
  & > * {
    margin-left: 2px;
    padding: 8px;
    color: #000;
  }
  & :first-child {
    font-size: 22px;
    margin-right: 8px;
    margin-top: 3px;
  }
`;

const Image = styled("img")({
  height: 40,
  width: 40,
  borderRadius: "50%",
});

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { account } = useContext(AccountContext);

  console.log("Account picture URL:", account.picture);

  const urlBackend = 'https://chat-app-ubyx.onrender.com';

  const proxyUrl = `${urlBackend}/profile-image?url=${encodeURIComponent(account.picture)}`;

  const toggleDrawer = () => {
    setOpenDrawer(true);
  };

  return (
    <>
      <Component>
        <Image
          src={proxyUrl}
          alt="profile image"
          onError={() => setImgError(true)}
          onClick={toggleDrawer}
        />
        <Wrapper>
          <MessageIcon />
          <HeaderMenu setOpenDrawer={setOpenDrawer} />
        </Wrapper>
      </Component>
      <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} />
    </>
  );
};

export default Header;
