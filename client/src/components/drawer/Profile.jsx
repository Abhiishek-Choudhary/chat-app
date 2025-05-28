import { useContext } from "react";

import { Box,Typography,styled } from "@mui/material";

import { AccountContext } from "../../context/AccountProvider";


const ImageContainer = styled(Box)`
    display: flex;
    justify-content: center;
`;

const Image = styled('img')({
    width: 200,
    height: 200,
    borderRadius: '50%',
    padding: '25px 0'
});

const BorderWrapper = styled(Box)`
    background: #ffffff;
    padding: 12px 30px 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    & :first-child{
        font-size: 13px;
        color: #009688;
        font-weight: 200;
    }
    & :last-child{
        margin: 14px 0;
        color: #4A4A4A;
    }
`;

const DiscriptionContainer = styled(Box)`
    padding: 15px 20px 28px 30px;
    & > p{
        font-size: 13px;
        color: #8696a0;
    }
`

const Profile = () => {

  const {account}  = useContext(AccountContext);

  return (
    <>
    <ImageContainer>
        <Image src={account.picture} alt="Profile picture" />
    </ImageContainer>
    <BorderWrapper>
        <Typography>Your name</Typography>
        <Typography>{account.name}</Typography>
    </BorderWrapper>
    <DiscriptionContainer>
        <Typography>This is not your username or pin. This name will be visible to your whatsapp Contacts.</Typography>
    </DiscriptionContainer>
    <BorderWrapper>
        <Typography>About</Typography>
        <Typography>Dont Mess with the dragon emperor!!</Typography>
    </BorderWrapper>
    </>
  )
}

export default Profile;