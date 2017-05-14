
var express=require('express');
var path=require('path');
var fs=require('fs');
var events=require('events');
var eventEmitter=new events.EventEmitter();
var db=require('./dbConnect.js');
var app=express();
var bodyParser=require('body-parser');
const nodemailer = require('nodemailer');
app.listen(3000);
console.log("Server is running");
app.use(express.static('controllers'));
app.use(bodyParser.json());
//console.log(__dirname);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/',function(request,response){
    response.sendFile(__dirname+"/index.html");
});
app.get('/css/home.css',function(request,response){
    response.sendFile(__dirname+"/css/home.css");
});

app.get('/ImageCategory',function(request,response){
  response.sendFile(__dirname+"/html/ImageCategory.html");
//response.redirect('/ImageCategory');
    });
app.get('/contact',function(request,response){
    response.sendFile(__dirname+"/html/contact.html");
    });
app.get('/thankyou',function(request,response){
    response.sendFile(__dirname+"/html/thankyou.html");
    });
app.get('/home',function(request,response){
  console.log("request received");
    response.sendFile(__dirname+"/html/home.html");

});
app.get('/submitImage',function(request,response){
    response.sendFile(__dirname+"/html/submit.html");

});
app.get('/controllers/Images.js',function(request,response){
    response.sendFile(__dirname+"/controllers/Images.js");

});

app.get('/Index/:url',function(request,response){
  console.log("Image request received");
  console.log(request.params.url);
 response.sendFile(__dirname+"/Images/Index/"+request.params.url);
});
app.get('/Image/:name/:url',function(request,response){
  console.log("Image request received");
  console.log(request.params.name,request.params.url);
 response.sendFile(__dirname+"/Images/"+request.params.name+"/"+request.params.url);
});

app.get('/ImageCategory/:name',function(request,response){
    console.log("Image Category request received");
    db.getCategory(request.params.name).then(function(result){
      console.log("result is"+ JSON.stringify(result));
    response.json(result);
    });
    });

app.get('/ImageNameScope',function(request,response){
  console.log("request received");
  console.log("Inside server");
  db.getList().then(function(result){
   //console.log(result);
   response.json(result);
 },function(error){
   console.log(error);
 });
});
app.get('*',function (request, response) {
      response.redirect('/');
});
app.post('/contactRequest',function(request,response){
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
       user: 'dummyjtuck82@gmail.com',
       pass: 'dummypassword'
   }
});
// setup email data with unicode symbols
let mailOptions = {
   from: request.body.email, // sender address
   to: 'maddiesaddie@gmail.com', // list of receivers
   subject: request.body.name, // Subject line
   text: request.body.message, // plain text body // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
   if (error) {
       return console.log(error);
   }
   console.log('Message %s sent: %s', info.messageId, info.response);
});

        });
