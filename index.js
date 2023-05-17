const express = require("express");
const WebSocket = require("ws");
const http = require("http");


// create server
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 80;


// test route of home
app.get("/", (req, res) => {
    res.send("hello");
})


// websocket server
const wsSocket = new WebSocket.Server({ server: server })// here the websocket server is iniitalized

wsSocket.on("connection", (socket) => {
    socket.send("hello there form websocket");

    // recive message from the websocket
    socket.on("message", function incoming(message) {
        // console.log("recived message as %s ",message)
        if (!message) {
            socket.send("not recived the message");
        }
        // if the message is recived then
        wsSocket.clients.forEach((client)=> {
            // if (client !== socket && client.readyState === WebSocket.OPEN) {
            if ( client.readyState === WebSocket.OPEN) {

                console.log("recived message is %s",message)
                
                client.send(message);
            }
        });
    })
})

// listen server
server.listen(port, (error) => {
    if (error) {
        console.log("sever not started");
    } else {
        console.log("server started");
    }
});