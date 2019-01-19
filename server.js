// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.get("/api/timestamp",function(req,res){
  let curTime = new Date;
  res.json({"unix": curTime.getTime(),"uts": curTime.toUTCString()}
)});
app.get("/api/timestamp/:digit_string",function(req,res){
const request =  req.params.digit_string.replace('/api/timestamp/','');
  
    console.log(request);
    let reg = /^\d+$/;
    if(reg.test(request))
    {
      console.log("digit");
      let d = new Date(parseInt(request,10));
      if(!isNaN(d.getTime()))
    {
      res.json({"unix": d.getTime(),"utc": d.toUTCString()});
    }
    else res.json({"unix": null, "utc" : "Invalid Date" });
      
    }
   else{
     console.log("non digit");
    let d = new Date(request);
    if(!isNaN(d.getTime()))
    {
      res.json({"unix": d.getTime(),"utc": d.toUTCString()});
    }
    else res.json({"unix": null, "utc" : "Invalid Date" });}

});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});