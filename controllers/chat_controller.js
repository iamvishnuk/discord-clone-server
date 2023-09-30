const { Server } = require("socket.io");

module.exports = function chatConfig(httpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: [process.env.FRONT_END_URL],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("Socket connection established 💬🚀", socket.id)
    })
};
