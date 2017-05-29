var express = require('express');
const app = express();
var dateConv = require("./dateTimeToNaturalStringConverter");
var fs= require('fs');
var date;
var str = "";
app.get("/", function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    fs.readFile("./index.html", function(err, html){
        if (err) throw err;
        res.write(html);
        res.end();
    })
})
app.get("*", function(req,res){
    res.setHeader('Content-Type', 'text/plain');
    str = decodeURI(req.url).replace("/","");
    date = new Date(Number(str));
    if (date == "Invalid Date"){
        date = new Date(str);
    }
    if (date == "Invalid Date") {
        res.end('{"unix": null, "natural": null }');
    } else {
        res.end('{"unix": '+ date.getTime()+ ', "natural": "' +dateConv(date) +'"}');
    }
    
    
    
    
})
app.listen(0);