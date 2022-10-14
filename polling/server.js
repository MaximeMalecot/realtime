const express = require('express');
const cors = require ('cors');
const server = express();

server.use(cors());
server.use(express.json());

/**** REGULAR POLLING ****/

const users = [
    {
        id: 1,
        email: "test@gmail.com"
    }, {
        id: 2,
        email: "test2@gmail.com"
    },{
        id: 3,
        email: "test3@gmail.com"
    },
]

server.get('/users', (req, res) => {
    res.json(users)
})

/**** LONG POLLING ****/

const subscribers = []



server.get('/users_sub', (req, res) => {
    const id = Date.now();
    subscribers[id] = res;
    req.on('end', function(){
        delete subscribers[id];
    })
})

setInterval(() => {
    for ( let subscriber of Object.values(subscribers)){
        subscriber.json(users)
    }
}, 1000)

setInterval(() => {
    let id = Math.floor(Math.random() * (100 - 4) + 4);
    users.push({
        id,
        email: `test${id}@gmail.com`
    })
}, 5000)



server.listen(3000, ()=> console.log("Server is listening on port 3000"));
