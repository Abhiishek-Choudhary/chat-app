import { createContext, useState, useRef, useEffect } from "react";

import { io } from 'socket.io-client'

export const AccountContext = createContext(null);

const AccountProvider = ({ children }) =>{

   const [account, setAccount] = useState();
   const [person, SetPerson] = useState([]);
   const [activeUsers, setActiveUsers] = useState([]);
   const [newMessageFlag, setNewMessageFlag] = useState(false);

   const socket = useRef();

   useEffect(() =>{
      socket.current = io('https://chat-server-htbg.onrender.com');
   }, [])

   return (
      <AccountContext.Provider value={{
            account,
            setAccount,
            person,
            SetPerson,
            socket,
            activeUsers,
            setActiveUsers,
            newMessageFlag,
            setNewMessageFlag
      }}> 
          {children}
      </AccountContext.Provider>
   )

}


export default AccountProvider;