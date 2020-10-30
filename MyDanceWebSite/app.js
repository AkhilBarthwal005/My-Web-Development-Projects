const express = require("express");
const path = require("path");
const app = express();
const port = 5000;
const bodyparser=require("body-parser"); // here we do not use the body-parser
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true ,useUnifiedTopology: true});


//Define mongoose schema
const contactSchema = new mongoose.Schema({
    Name: String,
    Phone: String,
    Email: String,
    Gender: String,
    Address: String,
    Dancestyle: String
  });

// Model
const contact = mongoose.model('contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use("/static",express.static("static"));
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//ENDPOINT
app.get("/",(req,res)=>{
    let params={ };
    res.status(200).render("home.pug",params);
});
app.get("/contact",(req,res)=>{
    let params={ };
    res.status(200).render("contact.pug",params);
});
// post request
app.post("/contact",(req,res)=>{
    var mydata= new contact(req.body);  // here we are creating a new object with name contact from request.body.
    mydata.save().then( ()=>{  // it gives us promes for that we use then command.
        res.send("Your Response has been Submited Sucessfully in the DataBase");
    }).catch(()=>{ // if any error occure then catch command will work.
        res.status(400).send("Your Response has been Submited in the DataBase || please Try Again")
    }); 
    // res.status(200).render("contact.pug",params);
});
//START THE SERVER
app.listen(port,(req,res)=>{
    console.log(`The application stated successfully on ${port}`);
});
