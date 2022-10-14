import { Server } from "socket.io"

const io = new Server(9000, {
    cors: {
        origin: "http://localhost:8000"
    }
})

io.on("connection", () => {
    console.log("New client")
})