const { Server } = require("socket.io");

module.exports = function chatConfig(httpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: [process.env.FRONT_END_URL],
            credentials: true,
        },
    });

    const onlineUsers = new Map();

    io.on("connection", (socket) => {
        console.log("Socket connection established 💬🚀", socket.id);

        // for setting the online users in an array
        socket.on("online-user", (userId) => {
            onlineUsers.set(userId, socket.id);
            console.log("online user list => ", onlineUsers);
            // sending the online user list to client side
            io.emit("online-user-list", Array.from(onlineUsers.keys()));
        });

        socket.on("request-online-user-list", () => {
            io.emit("online-user-list", Array.from(onlineUsers.keys()));
        });

        socket.on("disconnect-user", (userId) => {
            console.log("disconnect userId => ", userId, socket.id);
        });
    });
};
