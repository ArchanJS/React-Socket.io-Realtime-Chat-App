const express=require('express');
const socketIO=require('socket.io');
const http=require('http');
const cors=require('cors');

const app=express();
const port=8000;

app.use(cors());

const server=http.createServer(app);

const io=socketIO(server);

const users=[{}];

io.on('connection',(socket)=>{
    socket.on('joined',({user})=>{
        users[socket.id]=user;
        socket.emit('welcome',{user:"Admin",message:"Welcome to our chat app!",own:false});
        socket.broadcast.emit('inform',{user:"Admin",message:`${users[socket.id]} joined!`,own:false});
    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('leave',({user:"Admin",message:`${users[socket.id]} left!`,own:false}));
    })
    socket.on('message',({message,id})=>{
        console.log(message,id);
        io.emit('sendmessage',{user:users[socket.id],id,message});
    })
})

server.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})