var express = require("express");
var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", function(req, res){
    res.send("Welcome home!");
});

app.post("/api/new", function(req, res){
    res.json(req.body);
});

app.listen(PORT, function(){
    console.log(`Server is running on http://localhost:${PORT}`);
});