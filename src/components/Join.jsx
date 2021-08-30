import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Join = () => {

    const history=useHistory();

    const [name,setName]=useState("");

    const sendName=()=>{
        if(name.trim()==="") window.alert("Please enter a valid name!");
        else history.push(`/chat/${name}`);
    }

    return (
        <div className="join-div">
            <h1 className="join-header">Chat App</h1>
            <input type="text" className="join-inp" placeholder="Enter you name" value={name} onChange={(e)=>setName(e.target.value)} />
            <button className="join-btn" onClick={sendName}>Join</button>
        </div>
    )
}

export default Join
