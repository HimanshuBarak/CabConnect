import React,{useState,useRef,useContext,useEffect} from 'react'
import Avatar from 'react-avatar';
import './chat.css'
import AuthContext from '../../context/AuthContext'
import axios from 'axios'
import ParticlesBg from 'particles-bg'
import {useLocation} from 'react-router-dom'

// so this basically the layout of the whole component 
function Chat() {  
  const [width,setwidth] = useState(window.innerWidth);
  const location = useLocation() 
  const [chatroom,setchatroom] = useState(location.state.chatroom)
  
   
  


    return (<div>
         <ParticlesBg  type="cobweb" num="140" bg={true} /> 
         <div className={`container chatbox ${width>500?"shadow":""}`}>
        <header>
        <h1 align="center" style={{marginBottom:"30px"}} >{chatroom} Group Chat</h1> 
        </header>
      <section>
        <ChatRoom /> 
      </section> 
        </div>
    </div>       
    )
}



//this is where sending message ,recieving messages and joining and leaving of room happens
  function ChatRoom() { 
    const {user,getuser,socket} = useContext(AuthContext);
    
    const [messages,setmessages] = useState([]); 
    const [formValue, setFormValue] = useState('');
    const location = useLocation() 
    const [chatroom,setchatroom] = useState(location.state.chatroom)
   
    
    //sending a message
    async function sendMessage(e)
    {
      e.preventDefault(); 
       
      try{
        if (socket) {
          socket.emit("message", {
            chatroom,
            username:user.name,
            email:user.email,
            text: formValue,
           
          });
       
        setFormValue('');
        getMessages()
        }
      }catch(err){
           console.error(err)
      }
      
    }
     
    //fetch the already present messages and lets see what can be done here
    async function getMessages(){
         
      const result = await axios.get("http://localhost:8000/chat/chatroom",{
        params: {
          chatroom
        }
      })
      setmessages(result.data)
     
      
    }

     useEffect(() => {
      if (socket) {
        socket.on("newMessage", (message) => {
          if(message.chatroom === chatroom){
            const newMessages = [...messages, message];
            setmessages(newMessages);
          }
          
          
        });
       
      }
      //eslint-disable-next-line
    }, [messages]);
    


     useEffect(() => {
       
          if (socket) {
            socket.emit("joinRoom", {
              chatroom,
            });
            getMessages()
          }
      
          return () => {
            //Component Unmount
            if (socket) {
              socket.emit("leaveRoom", {
                chatroom,
              });
            }
          };
        
     }, [])
    
    return (<>
      <main>

        {messages && messages.map(msg => <ChatMessage key={msg._id} message={msg} />)}
      </main>
      <form onSubmit={sendMessage} className="form">
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Enter your message" className="in_box"/>
        <button type="submit" disabled={!formValue} className="text-primary" className="btn send btn-info">Send</button>
      </form>
    </>)
  }

  function ChatMessage(props) {
    const { text, username,email,chatroom } = props.message;
    const {user} = useContext(AuthContext);
    const [currentemail,setemail] =useState(user.email)
    const messageClass = email === currentemail ? 'sent' : 'received';
  //  const display = 
  return (<>
    <div className={`message ${messageClass}`}>
   
    <p> <span>{username}</span> <br />{text}</p>
    </div>
  </>)
  }
export default Chat
