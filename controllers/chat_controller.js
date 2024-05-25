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
            // onlineUsers.set(userId, socket.id);
            onlineUsers.set(socket.id, userId);
            console.log("online user list => ", onlineUsers);
            // sending the online user list to client side
            io.emit("online-user-list", Array.from(onlineUsers.values()));
        });

        socket.on("request-online-user-list", () => {
            io.emit("online-user-list", Array.from(onlineUsers.values()));
        });

        socket.on("disconnect-user", (userId) => {
            console.log("disconnect userId => ", userId, socket.id);
        });

        socket.on("disconnect", (reason) => {
            //remove the current user from the online user list
            onlineUsers.delete(socket.id);
            io.emit("online-user-list", Array.from(onlineUsers.values()));
        });
    });
};
