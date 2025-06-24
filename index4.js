import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var bandName = "";

// use body parser to access the body of the request = to use req.body whch give the key:value pair of the html form
app.use(bodyParser.urlencoded({ extended: true }));

// use req.body["key"] to get hold of the values entered in the HTML form
function bandNameGenerator(req, res, next) {
  console.log(req.body);
  bandName = req.body["street"] + req.body["pet"];
  next();
}

// to use our custom middle ware where we get hold on the value entered by the user
app.use(bandNameGenerator);

//to get the html file to the user
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// to give a response after the user is redirected to the /submit url by the HTML form = due to the post request to /submit URL
app.post("/submit", (req, res) => {
  // we can delete our custom middle ware and just copy the variable here:-  bandName = req.body["street"] + req.body["pet"];
  res.send(`<h1>Your band name is:</h1><h2>${bandName}✌️</h2>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
