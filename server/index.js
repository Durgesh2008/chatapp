const ConnectToMongoose=require('./db');
const express=require('express');
const cors = require('cors')
require('dotenv').config()
const socket=require('socket.io');
const app=express();
app.use(cors())
app.use(express.json())


ConnectToMongoose();
app.use("/api/auth", require('./routes/auth'))
app.use("/api/msg/", require('./routes/msgs'))
const server= app.listen(5000|| 8000)
const io=socket(server,{
    cors:{
        origin:process.env.frontend_url,
        credentials:true,
    } ,  
});


global.onlineUsers=new Map();
 
io.on('connection',(socket)=>{
    global.chatSocket=socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id)
    }); 
    socket.on("send-msg",(data)=>{
        const sendUserSocket=onlineUsers.get(data.to)
        
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.message)
        } 
    });

})