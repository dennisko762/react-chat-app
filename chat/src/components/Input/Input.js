import React from "react"


import "./Input.css"

//destructuring the parameters passed inside the Chat.js
const Input =({message, setMessage, sendMessage})=>
    (
<form className="form">
    <input className="input" type="text" placeholder="Type a message.."
    value={message}
    onChange={(event)=>setMessage(event.target.value)}
    onKeyPress={event=>event.key==="Enter"? sendMessage(event):null}></input>
    <button className="sendButton" onClick={(event)=>sendMessage(event)}>Send</button>
</form>

    )

export default Input
