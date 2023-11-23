const express = require("express");
const app = express();
const rootRouter = require("./routes/root.routes");
const bodyParser = require("body-parser");
const authMiddleware = require("./utils/auth");
const cors = require("cors");
require("dotenv").config();
require("./utils/connection");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authMiddleware);
app.use("/", rootRouter);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});