import {React,useEffect,useState} from "react";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { IconButton } from "@material-ui/core";

import "./Input.css";

//destructuring the parameters passed inside the Chat.js
function Input({ message, setMessage, sendMessage }) {

  const [fileSelector,setFileSelector] =useState();


  useEffect(()=>{
    const fileSelector = document.createElement('input');
    setFileSelector(fileSelector);
  fileSelector.setAttribute('type', 'file');
  fileSelector.setAttribute('multiple', 'multiple');
    },[])
    

function handleFileSelect(e) {
    e.preventDefault();
    fileSelector.click();
  }


  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message.."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      ></input>
      <div className="attachFileIcon">
        <IconButton type="file" onClick={(e) => handleFileSelect(e)}>
          <AttachFileIcon
            className=""
            style={{ fontSize: 30, marginRight: 20 }}
          ></AttachFileIcon>
        </IconButton>
      </div>

      <button className="sendButton" onClick={(event) => sendMessage(event)}>
        Send
      </button>
    </form>
  );
}

export default Input;
