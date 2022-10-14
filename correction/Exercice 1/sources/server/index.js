import express from "express"
import crypto from "crypto"

const EVERY_FIVE_SECONDS = 5000

const generateRandomHexadecimal = () => crypto.randomBytes(10).toString("hex")

const generateEmail = () => `${generateRandomHexadecimal()}@${generateRandomHexadecimal()}.com`

const generateIdentifier = () => generateRandomHexadecimal()

const generateUsers = () => Array.from(Array(10)).map(() => ({
    email: generateEmail(),
    identifier: generateIdentifier()
}))

let users = []

const server = express()

server.use(express.static("sources/client"))

server.get("/api/users", (request, response) => {
    response.json(users)
})

server.listen(8000, "0.0.0.0", () => {
    console.log("Server listening")
})

setInterval(() => {
    users = generateUsers()
}, EVERY_FIVE_SECONDS)