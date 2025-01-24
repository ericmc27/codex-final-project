import { Server } from 'socket.io'
import http from 'http'
import jwt from "jsonwebtoken"

const server = http.createServer()
export const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET"]
    }
})

const users = {} //To keep track of connected users

io.on('connection', (socket)=>{

    socket.on('messageToLawyer', (email, message)=>{
        let client = users[socket.id]

        for(const key in users){
            if(users[key]===socket.id){
                client = key
                break
            }
        }

        const socketId = users[email]
        io.to(socketId).emit('clientMessage', message, client)
    })

    socket.on('messageToClient', (clientEmail, lawyerMessage)=>{
       let clientSocketId;

       for(const email in users){
            if(email===clientEmail){
                clientSocketId = users[email]
                break
            }
        }
    
        io.to(clientSocketId).emit('lawyerMessage', lawyerMessage)
    })

   socket.on('addUser', (token)=>{
        const email = jwt.decode(token)?.sub

        if(email !== undefined){
            users[email] = socket.id
        }

   })

   socket.on('isLawyerConnected', (lawyer)=>{
    let flag = users[lawyer]
    console.log(flag)

    if (flag === undefined){
        flag = false
    }else{
        flag = true
    }

    socket.emit('lawyerConnectionStatus', {lawyer:lawyer, status:flag})
   })

   socket.on('lawyerDashboardUpdate', ({type, clientEmail})=>{

        if(type === "submitCase"){
            console.log("new incoming case")
            io.emit("newIncomingCase")
        }
        else if(type === "acceptCase"){
            console.log("accepted case")
            const socketId = users[clientEmail]
            io.emit("newOpenCase")
            io.to(socketId).emit("lawyerAcceptedYourCase")
        }
        else if(type === "rejectCase"){
            console.log("case was rejected")
            const socketId = users[clientEmail]
            io.emit("newRejectedCase")
            io.to(socketId).emit("lawyerRejectedYourCase")
        }

   })

   socket.on('lawyerUpdate', ()=>{
    console.log("lawyer updated something")
    io.emit('lawyerPictureUpdate')
   })
})

server.listen(5000)
