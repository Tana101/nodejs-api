const dotenv = require('dotenv').config();
const express = require("express");
const cors = require('cors');

const app = express();

app.use(cors());
app.options('*', cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "NodeJS API." });
});

require("./app/routes/api.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(dotenv.parsed);
    console.log(`Server is running on port ${PORT}.`);
});