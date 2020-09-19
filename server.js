// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();


// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("index.html", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

// BEGIN FIREBASE DATABASE CALL
var admin = require("firebase-admin");

var serviceAccount = {serviceAccount: {
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY
}};

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://sustainability-hack-mit.firebaseio.com"
// });

admin.initializeApp({
  // credential: admin.credential.cert(serviceAccount),
  serviceAccount: {
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY
  },
  databaseURL: 'https://'+process.env.PROJECT_ID+'.firebaseio.com'
});

// reference to database
var database = admin.database();

function exampleSet(){
  database.ref("barcodes").set({
    alanisawesome: {
      date_of_birth: "June 23, 1912",
      full_name: "Alan Turing"
    },
    gracehop: {
      date_of_birth: "December 9, 1906",
      full_name: "Grace Hopper"
    }
  });
}

function exampleGet(){
  database.ref("barcodes").once('value').then(
  function(snapshot) {
    console.log(snapshot.val())
  }
  ); 
}

// exampleSet();
exampleGet();