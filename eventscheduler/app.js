const express = require("express");
const bodyParser = require("body-parser");
const conferenceController = require("./controllers/conferenceController");

const app = express();
const port = 3000;

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// Mount the conference controller
app.use("/api", conferenceController);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
