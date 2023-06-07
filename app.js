const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const dbConnect = require("./dbConnect");
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
const cors = require('cors');
const budgetRouter = require("./routes/budgetRoutes");
//start databse connection
dbConnect();

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.json());

//middleware

app.use((req, res, next) => {
  console.log('new request made: ');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});

app.get("/", (req, res, next) => {
    res.send(`
    <h2> Life is good </h2>
    <h1> My database </h1>
    `)
    next();
})

// budget routes

app.use(budgetRouter);

module.exports = app;