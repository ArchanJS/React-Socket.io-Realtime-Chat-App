import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import socketIO from 'socket.io-client';
const ENDPOINT='http://localhost:8000/';

function Chat() {
    
    let socket;
    
    const [message,setMessage]=useState("");
    const [id,setId]=useState("");
    const [skt,setSkt]=useState();
    const [totalMessages,setTotalMessages]=useState([]);
    
    
    const {user}=useParams();

    useEffect(()=>{
        socket=socketIO(ENDPOINT,{transports:['websocket']});
        socket.emit('joined',{user});
        socket.on('welcome',({user,message,own})=>{
            console.log(`${user}: ${message}`);
            setId(socket.id);
            setSkt(socket);
            setTotalMessages([...totalMessages,{message,user,own}]);
        });
        socket.on('inform',({user,message,own})=>{
            console.log(`${user}: ${message}`);
            setTotalMessages([...totalMessages,{message,user,own}]);
        })
        socket.on('leave',({user,message,own})=>{
            console.log(`${user}: ${message}`);
            setTotalMessages([...totalMessages,{message,user,own}]);
        })
        return ()=>{
            socket.disconnect();
            socket.off();
        }
    },[])

    useEffect(()=>{
        if(!socket) socket=skt;
        socket.on('sendmessage',({user,id,message})=>{
            console.log(`user: ${user}, id: ${id}, message: ${message}`);
            console.log(socket.id);
            let own=id===socket.id?true:false;
            setTotalMessages([...totalMessages,{message,user,own}]);
            console.log(totalMessages);
        })
    },[totalMessages])

    const send=(e)=>{
        e.preventDefault();
        socket=skt;
        if(!message.trim()) window.alert("Please type a message!");
        else socket.emit('message',{message,id});
        setMessage("");
    }




    return (
        <div className="chat-div">
            <div className="messages">
                {
                    totalMessages
                    ?
                    totalMessages.map(({message,user,own},ind)=>{
                        return <div className={own?"sent-message":"received-message"} key={ind}>{own?"You":user}: {message}</div>
                    })
                    :
                    null
                }
            </div>
            <form className="chat-input-div">
                <input type="text" className="message-inp" placeholder="Type a message..." value={message} onChange={(e)=>setMessage(e.target.value)}/>
                <button type="submit" className="message-btn" onClick={send}>Send</button>
            </form>
        </div>
    )
}

export default Chat
