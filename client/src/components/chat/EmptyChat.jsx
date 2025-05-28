import { Box, Typography,styled,Divider } from '@mui/material';

import { emptyChatImage } from '../../constants/data';

const Component = styled(Box)`
   background: #f8f9fa;
   padding: 30px 0;
   text-align: center;
   height: 100vh;
`;

const Container = styled(Box)(({ theme }) => ({
  padding: '0 200px',
  [theme.breakpoints.down('md')]: {
    padding: '0 50px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '0 20px',
  },
}));


const Image = styled('img')(({ theme }) => ({
  width: '400px',
  marginTop: 100,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginTop: 50,
  },
}));


const Title = styled(Typography)`
   font-size: 32px;
   margin: 25px 0 25px 0;
   font-family: inherit;
   font-weight: 300;
   color: #41525d;
`;

const Subtitle = styled(Typography)`
   font-size: 14px;
   color: #667781;
   font-weight: 400;
   font-family: inherit;
`;

const StyledDivider = styled(Divider)`
   margin: 40px 0;
   opacity: 0.4;
`;

const EmptyChat = () =>{

   return(
     <Component>
         <Container>
            <Image src={emptyChatImage} alt='Empty Chat screen Illustration' />
            <Title >Whatsapp Web</Title>
            <Subtitle >Now send and recieve message without keeping your phone online.</Subtitle>
            <Subtitle >Use whatsapp on up to 4 linked device and 1 phone at the same time.</Subtitle>
            <StyledDivider />
         </Container>
     </Component>
   )

}

export default EmptyChat;