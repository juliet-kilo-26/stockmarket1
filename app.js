var express= require('express');
var app= express();
var nodemon= require('nodemon');
var morgan= require('morgan');
var request= require('request');
var bodyParser=require('body-parser');
var pug= require('pug');
var port= process.env.PORT || 3000;
app.listen(3000, ()=>console.log("server running on", port));

const url="https://api.iextrading.com/1.0/market";

app.set("view engine", "pug");
app.use(morgan('combined'));

app.use('/public', express.static('public'));
app.get("/", function(req,res,next){

request(url,function(error, response, body){
    market_json=JSON.parse(body);


    var numbers = {
      title : "Today's Market Place",
      mic : market_json.mic,
      Tape_Identification : market_json.tapeId ,
      Venue_Name: market_json.venueName ,
      Volume_of_Traded_Shares: market_json.volume ,
      Tape_A_Traded_Shares: market_json.tapeA  ,
      Tape_B_Traded_Shares:  market_json.tapeB ,
      Tape_C_Traded_Shares:  market_json.tapeC ,
      Market_Percent: market_json.marketPercent ,
      last_updated: market_json.lastUpdated
    }




    res.render('index.pug', numbers);
});

});
