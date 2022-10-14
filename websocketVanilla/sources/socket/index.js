import { Server } from "socket.io"

const io = new Server(9000, {
    cors: {
        origin: "http://localhost:8000"
    }
})

io.on("connection", (socket) => {
    console.log("New client")

    socket.on('calculate', (num1, num2) => {
        let res = parseInt(num1)+parseInt(num2);
        socket.emit("calculated", res, num1, num2)
    })
})