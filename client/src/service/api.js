
import axios from 'axios';

const url = 'https://chat-server-htbg.onrender.com/';

export const addUser = async (data)=>{
    try{
       await axios.post(`${url}/add`, data);
    } catch(error){
        console.log("Error while addUser Api",error.message);
    }
}

export const getUsers = async () =>{
    try{
       let response = await axios.get(`${url}/users`);
        return response.data;
    } catch(error) {
        console.log("Error while calling getusersapi",error.message);
    }
}

export const setConversation = async (data) =>{
    try{
      await axios.post(`${url}/conversation/add`,data);
    }catch(error){
        console.log("Error while calling setConversation api", error.message);
    }
}

export const getConversation = async (data) => {
    try {
        const response = await axios.post(`${url}/conversation/get`, data);
        return response.data;
    } catch (error) {
        console.log("Error while calling getConversation api:", error.message);
        return null; // Ensure a predictable return value
    }
};


export const newMessage = async (data) =>{
  try{
     await axios.post(`${url}/message/add`, data);
  }catch(error){
    console.log("Error while calling new message",error.message);
  }
}

export const getMessages = async (id) =>{
    try{
       let response = await axios.get(`${url}/message/get/${id}`);
        return response.data;
    }catch(error){
         console.log("Error while calling getMessage api", error.message);
    }
}

export const uploadFile = async (formData) => {
  try {
    const response = await axios.post(`${url}/file/upload`, formData);
    // response.data.imageUrl should exist if successful
    return response.data;
  } catch (error) {
    console.error('Upload API error:', error.response || error.message);
    throw error;
  }
};
