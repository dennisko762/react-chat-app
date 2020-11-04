import React,{useState,useEffect} from "react"
import queryString from "query-string"
import io from "socket.io-client"
import   "./Chat.css"
import NavBar from "../NavBar/NavBar"
import Input from "../Input/Input"
import Messages from "../Messages/Messages"
import TextContainer from "../TextContainer/TextContainer"

let socket;

const Chat=({location})=>{
    const [name,setName]=useState("");
    const [room,setRoom]=useState("");
    const ENDPOINT="localhost:5000"
    const [messages,setMessages]=useState([]);
    const [message,setMessage]=useState("")
    const [users, setUsers] = useState('');


useEffect(()=>{
    //fetching the information from the link to get room and name
    //using destructured parameters
     const {name,room}=queryString.parse(location.search)
    
    //line above is equivalent to const name=queryString.parse(location.search).name
    //                                       queryString.parse(location.search).room

    console.log(location.search)
    socket=io(ENDPOINT)

   setName(name)
   setRoom(room)

    //emit is an event send to all clients
    //operation: join, some payload, a callback that we passed in the index.js
   socket.emit("join",{name,room},()=>{
    
   })
   //unmounting 
   return()=>{
       socket.emit("disconnect");
       console.log("we cleaned up ")
        socket.off()

   }
},[ENDPOINT,location.search])


useEffect(()=>{
    socket.on("message",(message)=>{
    setMessages([...messages,message]) //adding every new msg on top of the previous messages(...messages)
    })
    socket.on("roomData",({users})=>{
        setUsers(users)
    })
},[messages])

const sendMessage=(e)=>{
    e.preventDefault()
    if(message){
        socket.emit("sendMessage",message,()=>setMessage(""))
    }
}
console.log(message,messages)

    return(
<div className="outerContainer">
    <div className="container">
        <NavBar room={room}></NavBar>
        <Messages messages={messages} name={name}></Messages>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}></Input>
    </div>
    <TextContainer users={users}></TextContainer>
</div>


    )
}
export default Chat;