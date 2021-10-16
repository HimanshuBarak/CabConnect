import React ,{useState,useEffect,createContext} from 'react'
import axios from 'axios';
import {io} from "socket.io-client";

const AuthContext =createContext();
function AuthContextProvider(props) {
    const [loggedIn ,setLoggedIn] = useState(undefined);
    const [user,setuser] =useState('')
    const [socket, setSocket] = useState(null);

    async function getLoggedIn(){
        const response = await axios.get("http://localhost:8000/auth/loggedIn");
        setLoggedIn(response.data); //set it is as true or false
        
    }
    async function getuser(){
        const response = await axios.get("http://localhost:8000/auth/user");
        setuser(response.data); //set it is as true or false
        console.log(user)
       
    } 
    const setupSocket = () => {
     
         if(!socket){
          const newSocket = io("http://localhost:8000")
          newSocket.on("disconnect", () => {
            setSocket(null);
            setTimeout(setupSocket, 3000);
            console.log("Socket Disconnected!");
          });
    
          newSocket.on("connect", () => {
            console.log("Socket Connected!");
          });
    
          setSocket(newSocket);

         
         }
         
           
         
         
        
    
      }   
     
    useEffect(() => {
        getuser();
        getLoggedIn();
        setupSocket();
    }, [])

    return (
        <AuthContext.Provider value={{loggedIn,getLoggedIn,user,getuser,socket}}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContext;
export { AuthContextProvider};
