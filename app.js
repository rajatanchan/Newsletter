const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){

res.sendFile(__dirname + "/signup.html") ;
});
app.post("/",function(req,res){
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname
        }

      }
    ]
  };
  const url = "https://us21.api.mailchimp.com/3.0/lists/7626f5aedd";
  const options = {
    method: "POST",
    auth: "Darbur:55d6e21c681dac8a6c4aa21afab92407-us21"
  }
  const jsonData = JSON.stringify(data);
 const request = https.request(url,options,function(response){

   if (response.statusCode == 200){
     res.sendFile(__dirname + "/success.html");
   }
   else{
     res.sendFile(__dirname + "/failure.html");
   }
   response.on("data", function(data){
     console.log(JSON.parse(data));
   });
 });
 request.write(jsonData);
 request.end();
});

app.post("/failure", function(req,res){
  res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
  console.log("Server started at port 3000")
})

// API KEY
// 55d6e21c681dac8a6c4aa21afab92407-us21
// List idea
// 7626f5aedd
