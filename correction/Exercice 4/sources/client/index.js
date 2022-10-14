import { io } from "socket.io-client"

const socket = io("ws://localhost:9000")

socket.on("connect", () => {
    console.log("Connected to the socket")
})