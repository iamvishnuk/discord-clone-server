const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("./config/mongo");
const port = process.env.PORT;
const userRoutes = require("./routes/user_routes");

app.use(express.json());

// routes
app.use("/", userRoutes);

app.listen(port, () => {
    console.log(`listening on port ${port} 🚩`);
});
