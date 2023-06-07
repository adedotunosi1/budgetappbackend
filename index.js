const http = require('http');
const express = require('express');
const app = require('./app');
const dbConnect = require('./dbConnect');
const {engine} = require('express-handlebars');
app.engine(".handlebars", engine({ extname: ".handlebars" }));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));


const PORT = 4000;
app.listen(PORT, async () => {
  try {
    await dbConnect();
    Console.log(`server running on port ${PORT}`);
  } catch (error) {
    (error);
  }
});