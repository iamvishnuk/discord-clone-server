const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB connect to discord-clone 🚀");
    })
    .catch((err) => console.error("Error connecting to discord-clone", err));
