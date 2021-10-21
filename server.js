// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const app = express();

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
// const { json } = require("stream/consumers");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
projectData = {};
// Initialize the main project folder
app.use(express.static('website'));



// getall data
const getAll = (req,res)=>{
    res.status(200).send(projectData);
}
//get rout
app.get("/all",getAll);

const postData = (req,res)=>{
    projectData = req.body;
}

app.post("/add",postData);

// Setup Server
const port = 4000;
const hostname = "127.0.0.1";

const listening = ()=>{
    console.log(`Server Running At http://${hostname}:${port}`);
}

app.listen(port,listening);

