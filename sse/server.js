const express = require('express');
const cors = require ('cors');
const crypto = require('crypto');
const server = express();

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

const clients = [];

const convertMessage = ({ type, ...data }) => {
    return `event: ${type}\n` + `data: ${JSON.stringify(data)}\n\n`;
};

const broadcast = (message, client_id) => { // On envoie un evement à un client en particulier
    if(clients[client_id]){
        clients[client_id].write(convertMessage(message));
    }
}

const broadcastAll = (message) => { // On envoie un evenement à tous les clients
    if(Object.values(clients).length > 0){
        Object.values(clients).map((client) => {
            client.write(convertMessage(message));
        })
    }
}

server.get('/sse', (req, res) => { // Ligne permettant de connecter le client au serveur SSE
    try{
        const id = Date.now();
        clients[id] = res; // On stocke la requête dans un tableau pour pouvoir y accéder
        res.on("close", () => {
            delete clients[id];
        });
        const headers = { // On envoie les header permettant de garder une connexion http stable
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
        };
        res.writeHead(200, headers);
        broadcast({type: 'connect', id}, id);
    } catch(err) {
        console.error(err);
        res.end();
    }
})

setInterval(() => {
    users = generateUsers();
    broadcastAll({type: 'refresh', users});
}, 5000)

server.listen(3000, ()=> console.log("Server is listening on port 3000"));
