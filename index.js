const express = require("express");
const { createServer } = require("http")
const logger = require("morgan")
const app = express();
const httpServer = createServer(app)
require("dotenv").config();
const cors = require("cors");
const mongoose = require("./config/mongo");
const port = process.env.PORT;
const userRoutes = require("./routes/user_routes");
const chatConfig = require("./controllers/chat_controller")

app.use(
    cors({
        origin: [process.env.FRONT_END_URL],
        methods: ["GET","POST","DELETE"],
        credentials: true
    })
);

app.use(logger("dev"))
app.use(express.json());

// routes
app.use("/", userRoutes);

//chat 
chatConfig(httpServer)

httpServer.listen(port, () => {
    console.log(`listening on port ${port} 🚩`);
});
