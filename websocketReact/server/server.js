const express = require('express');
const cors = require ('cors');
const crypto = require('crypto');
const server = express();
const socket = require('socket.io');

server.use(cors());
server.use(express.json());

let users = []

const generateRandomHexadecimal = () => crypto.randomBytes(10).toString("hex")

const generateEmail = () => `${generateRandomHexadecimal()}@${generateRandomHexadecimal()}.com`

const generateIdentifier = () => generateRandomHexadecimal()

const generateUsers = () => Array.from(Array(10)).map(() => ({
    email: generateEmail(),
    identifier: generateIdentifier()
}))

const io = new socket.Server(9000,{
    cors: {
        origin: "*"
    }
})

io.on('connection', (socket) => (
    console.log(`New client ${socket}`)
))

server.listen(3000, ()=> console.log("Server is listening on port 3000"));
