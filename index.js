const express = require("express");
const connectDB = require("./config/db");

const cors = require("cors");

const app = express();
app.use(cors());
connectDB();

app.use(express.json({ extended: false }));

app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));

const PORT = 4999;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
