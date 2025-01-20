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

const users = {} //To keep track

io.on('connection', (socket)=>{

   socket.on('addUser', (token)=>{
        const email = jwt.decode(token).sub
        users[email] = socket.id
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
