
const express = require('express');
const app = express();
const { userRoutes } = require('./routes/userRoutes');
const { db } = require('./config/db');
const { Server } = require("socket.io");
const { createServer } = require("http");
const httpServer = createServer(app);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(express.json())
app.use('/api/user', userRoutes)

db.connect()


app.get('/', (req, res) => {
    res.send('OK')
})


const io = new Server(httpServer, {
    /* options */
});

io.on("connection", (socket) => {
    console.log("socket id" , socket.id)
    socket.on("chat", (data) => {
        io.to(data.id).emit("chatmessage", data.message);
    });
});

httpServer.listen(3030, () => {
    console.log("listening 3030");
});







