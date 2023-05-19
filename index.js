const express = require("express");
const WebSocket = require("ws");
const http = require("http");


// create server
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8990;


// test route of home
app.get("/", (req, res) => {
    res.send("hello");
})


// websocket server
const wsSocket = new WebSocket.Server({ server: server })// here the websocket server is iniitalized and is using the express
// here the socket process is required here
const socketProcess=require("./webSocketServer/index");
// this sends the wsSocket object to the process for the porcessing
socketProcess(wsSocket);



// wsSocket.on("connection", (socket) => {
//     socket.send("hello there form websocket");

//     // recive message from the websocket
//     socket.on("message", function incoming(message) {

//         if (!message) {
//             socket.send("not recived the message");
//         }
//         // if the message is recived then
//         wsSocket.clients.forEach((client) => {
//             // if (client !== socket && client.readyState === WebSocket.OPEN) {
//             if (client.readyState === WebSocket.OPEN) {
//                 // console.log(typeof(message))
//                 // try {
//                 //     // console.log(JSON.parse(message))
//                 //     const messageRecived = JSON.parse(message);
//                 //     const jsonResponse = {
//                 //         message: 'Response Recived is ',
//                 //         data: messageRecived,
//                 //     };

//                 //     // this will send the json response to the client
//                 //     const responseToSend = JSON.stringify(jsonResponse)
//                 //     client.send(responseToSend);

//                 // } catch (error) {
//                 // }
//                 client.send("the message sent is "+message)

//             }
//         });
//     })
// })

// listen server
server.listen(port, (error) => {
    if (error) {
        console.log("sever not started");
    } else {
        console.log("server started");
    }
});