const WebSocket = require("ws");

// unique id for the websocket
const {v4 : uuid} = require('uuid')
// websocket server



module.exports = (wsSocket) => {

    wsSocket.on("connection", (socket) => {
        // this gives a id to the client connected {to be replaced with the user id when used}
        socket.id = uuid();
        console.log("new client connected with id " + socket.id);
        // console.log(socket)
        socket.send("hello there form websocket");

        // recive message from the websocket
        socket.on("message", function incoming(message) {

            if (!message) {
                socket.send("not recived the message");
            } 
                try {
                    // console.log(JSON.parse(message))
                    const messageRecived = JSON.parse(message);
                    const jsonResponse = {
                        message: 'Response Recived is ',
                        data: messageRecived,
                    };

                    // this will send the json response to the client
                    const responseToSend = JSON.stringify(jsonResponse)
                    socket.send(responseToSend);

                } catch (error) {
                    const messageToSend = {
                        message: "Message format is not JSON",
                    }
                    socket.send(JSON.stringify(messageToSend))
                }
                
           


            // if the message is recived then  {this allows all the clients to see the message}
            // wsSocket.clients.forEach((client) => {
            //     // if (client !== socket && client.readyState === WebSocket.OPEN) {
            //     if (client.readyState === WebSocket.OPEN) {
            //         // console.log(typeof(message))
            //         try {
            //             // console.log(JSON.parse(message))
            //             const messageRecived = JSON.parse(message);
            //             const jsonResponse = {
            //                 message: 'Response Recived is ',
            //                 data: messageRecived,
            //             };

            //             // this will send the json response to the client
            //             const responseToSend = JSON.stringify(jsonResponse)
            //             client.send(responseToSend);

            //         } catch (error) {
            //             const messageToSend = {
            //                 message: "Message format is not JSON",
            //             }
            //             client.send(JSON.stringify(messageToSend))
            //         }

            //     }
            // });
        })
    })
}



