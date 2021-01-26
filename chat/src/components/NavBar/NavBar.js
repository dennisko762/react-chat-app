import React from "react"
import "./NavBar.css"
import onlineIcon from "../Icons/onlineIcon.png"
import closeIcon from "../Icons/closeIcon.png"


const NavBar=({room})=>{
    return(
<div className="navbar">
    <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="something"></img>
        <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
        <a href="/"><img src={closeIcon} alt="something"></img></a>
    </div>
</div>
    )
}

export default NavBar