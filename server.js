// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express =  require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 7000;

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

app.post('/gatheringData', (req, res) =>{
    projectData = { ...req.body};
    res.send();
})

app.get('/retrieveData', (req, res) =>{
    res.send(projectData);
})

const server = app.listen(port, listening);
function listening(){
    console.log("server running");
    console.log(`running on localhost:${port}`);
};
