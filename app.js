var express = require("express"), app = express(), methodOverride = require("method-override"), bodyParser = require("body-parser");

var HashMap = require('hashmap');

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended:true}))

var map = new HashMap();
// "/" => "Hi there"
app.get("/", function(req, res){
     res.render("request");
    
});

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}

function randomNumber(){
    var number;
    //111-111-1111 -> 999-999-9999(10000000000)
    number = randomInt(1111111111,10000000000);
    var strinfor = ''+number;
    var formNumber = strinfor.substring(0,3)+"-"+strinfor.substring(3,6)+"-"+strinfor.substring(6,10);
    while(map.has(formNumber)){
        number = randomInt(1111111111,10000000000);
        strinfor = ''+number;
        formNumber = strinfor.substring(0,3)+"-"+strinfor.substring(3,6)+"-"+strinfor.substring(6,10);
    }
    map.set(formNumber,1);
    return formNumber;
}

app.post("/request",function(req,res){
    var number = req.body.number;
    if(number == ''){
       var newNumber = randomNumber();
       var info = 'you did not pick up phone number, we will assign random one for you';
       res.render("empty",{info:info, newNumber:newNumber});
    }
    else if(map.has(number)){
       newNumber = randomNumber();
       info = 'System already contains, we will allot random one for you';
       res.render("empty",{info:info, newNumber:newNumber});
    }
    else{
       map.set(number,1);
       info = 'we accept your request, you will get the phone number you want';
       res.render("empty",{info:info, newNumber:number});
    }
    
});
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started !!!");
});