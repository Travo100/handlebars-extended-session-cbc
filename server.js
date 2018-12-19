require('dotenv').config();
var express = require("express");
var app = express();
var mysql  = require('mysql');
var PORT = process.env.PORT || 8080;
 
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : process.env.DBPASSWORD,
    database : 'schoolDB',
    port: 3306
});

connection.connect(function(err){
    if(err) throw err;
    console.log(connection.threadId);
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", function(req, res){
    connection.query("SELECT * FROM student", function(err, data){
        res.json(data);
    });
});

app.post("/api/new", function(req, res){
    res.json(req.body);
});

app.listen(PORT, function(){
    console.log(`Server is running on http://localhost:${PORT}`);
});