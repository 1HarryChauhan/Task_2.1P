const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');


var api_key ='d996417bb3ef89f3a8bdda7c4e618a35-7a3af442-2805c350'; 
var domain = 'sandbox0ebed3f082f54ee69143ebe15734055b.mailgun.org';
var mg = mailgun({apiKey: api_key, domain: domain});


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//start the express server on port 3000
app.listen(3000,()=>{
  console.log("Listening to localhost:3000");
})

//return the html file if client tries to get the default route

app.get('/',(req,res)=>{
  res.sendFile(__dirname +'/index.html');
});


// var confrim = document.getElementById('confirmation')

//execute the maailgun script when form is done submitting
app.post('/',(req,res)=>{
    const email = req.body.email;

    const data = {
    from: 'Harjot Singh <harjot4780.be23@chitkara.edu.in>',
    to: email,
    subject: 'Welcome EMAIL!',
    text: 'Welcome to Dev Link.'
    };
    
    mg.messages().send(data, function (error, body) {
      console.log(email);
  if(error){
    console.log(error);
    res.status(500).send('Error sending email');
  }else{
      
      console.log(body);
      res.sendFile(__dirname+'/index.html');
  }
});
})