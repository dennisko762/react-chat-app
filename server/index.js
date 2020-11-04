const express=require("express")
const socketio=require("socket.io")
const http=require("http")

//importing the helper functions
const{addUser,removeUser,getUser,getUserInRoom} =require ( "./users.js")

const PORT=process.env.PORT || 5000;

const router=require("./router")

const app=express();
const server=http.createServer(app);
const io=socketio(server);

    //connection established with a socket however http long polling will be used if http wont work for any reasons
    //io.on gets an event("connect") and a callback function with the param (socket)
io.on("connect",(socket)=>{

   //on the server side we listen to the join event and respond by printing out some data 
   //we also pass some pseudo error callback
        socket.on("join",({name,room},callback)=>{
        
        //destructuring the possible returns from the addUser helper function--> we either get the error message or the user
        const {error,user}=addUser({id:socket.id,name,room})

        if(error) return callback(error)

        socket.join(user.room)

        io.to(user.room).emit("roomData",{room:user.room, user:getUserInRoom(user.room)})

        socket.emit("message",{user:"admin",text:`${user.name}, welcome to the room ${user.room}`})
        //broadcast sends message to everyone except the user
       
        socket.broadcast.to(user.room).emit("message",{user:"admin",text:`${user.name}, has joined`})

        callback();
        console.log(user.id+"has joined")


    });
    socket.on("sendMessage",(message,callback)=>{
        const user = getUser(socket.id);
        io.to(user.room).emit("message",{user:user.name,text:message});
        io.to(user.room).emit("roomData",{room:user.room,user:getUserInRoom(user.room)});


        callback();
    })
    socket.on("disconnect",()=>{
    
const user=removeUser(socket.id)
if(user){
    io.to(user.room).emit("message",{user:"admin",text:`user ${user.name} has left`})
}
})
})


app.use(router)
server.listen(PORT,()=>console.log(`server has started on port ${PORT}`))