require('dotenv').config();
var express = require("express");
var exphbs  = require('express-handlebars');
var app = express();
var mysql  = require('mysql');
var PORT = process.env.PORT || 8080;
var connection;

if(process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : process.env.DBPASSWORD,
        database : 'schoolDB',
        port: 3306
    });
}


connection.connect(function(err){
    if(err) throw err;
    console.log(connection.threadId);
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get("/", function(req, res){
    connection.query("SELECT * FROM student", function(err, data){
        if(err) throw err;
        res.render("home", {
            students: data,
            title: "Handlebars Class"
        });
    });
});

app.post("/api/student", function(req, res){
    connection.query("INSERT INTO student SET ?", [req.body], function(err, data){
        if(err) throw err;
        res.redirect("/");
    });
});

app.put("/api/student/:id", function(req, res){
    var id = req.params.id;
    connection.query("UPDATE student SET ? WHERE ?", [req.body, {id: id}], function(err, data){
        if(err) throw err;
        res.json(data);
    });
});

app.delete("/api/student/:id", function(req, res){
    var id = req.params.id;
    connection.query("DELETE FROM student WHERE id = ?", [id], function(err, data){
        if(err) throw err;
        res.json(data);
    });
});

app.listen(PORT, function(){
    console.log(`Server is running on http://localhost:${PORT}`);
});