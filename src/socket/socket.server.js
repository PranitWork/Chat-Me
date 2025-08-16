const {Server } = require("socket.io")

const aiService = require("../services/ai.services")

function setupSocketServer(httpServer){
    const io = new Server(httpServer,{})
    io.on('connection',(socket)=>{
        console.log("A user connected");

        socket.on("ai-message", async (message)=>{
            const result = await aiService.generateContent(message);
            socket.emit("ai-message-response",result)
        })
        socket.on('disconnect',()=>{
            console.error("A user disconnected");
        });
    })
}

module.exports = setupSocketServer;