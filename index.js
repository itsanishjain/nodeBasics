const express = require("express")
require('dotenv').config();
var mongoose = require('mongoose');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MONGODB_ATLAS_PASSWORD = process.env.MONGODB_ATLAS_PASSWORD
const MONGODB_ATLAS_USERNAME = process.env.MONGODB_ATLAS_USERNAME
const PASSCODE = process.env.PASSCODE;


const app = express();
app.set("view engine","ejs") // views
app.use(express.static("public"));

// app.use(express.urlencoded({extended: true}));
app.use(express.json());


//Database Setup

//Set up default mongoose connection
var mongoDB = `mongodb+srv://${MONGODB_ATLAS_USERNAME}:${MONGODB_ATLAS_PASSWORD}@cluster0.cydnc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;


//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//Define a schema
var Schema = mongoose.Schema;

var profileSchema = new Schema({
  email: {type:String,required:[true,"Please enter your email"]},
  password:String,
  created: {type:Date,default:Date.now()}
});

var profileModel = mongoose.model('profileModel', profileSchema );





app.get("/",(req,res)=>{
    
    res.render("home.ejs")
})

// Openai api call
app.post("/openaiAPICall",(req,res)=>{
    const passcode = req.body.passcode;
    console.log(PASSCODE,passcode);
    let message = "";

    if (passcode == PASSCODE){
        message = "Good to go";
        console.log("Good to go");


    } 
    else{
        message = "Bam! not Authorize";
        console.log("Bam! not Authorize")
    }
    return res.send({message:message})
})

function openai(){
    
}


app.post("/signup",(req,res)=>{
    const email = req.body.email;
    const password =  req.body.password;
    console.log("hi post",email,password);

    // profileModel.create({ email: email,password:password });

    profileInstance = new profileModel({email:email,password:password})
    console.log("Instance",profileInstance);
    //save the instance
    profileInstance.save((error)=>{
        if(error) return "Error!!";
        return "done";
    })


    res.json("Post is here")
})

app.get("/getAllProfiles",(req,res)=>{
    const profiles = profileModel.find
    res.send("Hola")
})


app.listen(3000,()=>"listing on port 3000....")