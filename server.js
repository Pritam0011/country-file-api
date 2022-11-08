const express=require('express');
const app=express();
require('dotenv').config();
const cors=require('cors');
const fileUpload = require('express-fileupload');
const bodyParser=require("body-parser");
const mysql = require('mysql')
const path = require('path');

//database
const con = mysql.createConnection({
  host: "sql12.freemysqlhosting.net",
  user: "sql12547968",
  password: "VilARmvP7l",
  database : 'sql12547968'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

global.db=con;

//cors
const corsOpt={
    origin:'*',
    methods:['GET','POST'],
    allowedHeaders:['Content-Type',],
}
/* Allowing the server to accept requests from other domains. */
app.use(cors(corsOpt));

// engine 
app.set('views',path.join(__dirname,'/views'));
app.set('view engine', 'ejs');


PORT=process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Listening on http://localhost:${PORT}`);
})



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static('views'));
app.use(fileUpload());



/* Telling the server to use the `/api/country` route. */
app.use('/api/country',require('./routes/country'));

/* Telling the server to use the `/api/add` route. */
app.use('/api/add',require('./routes/data'));


