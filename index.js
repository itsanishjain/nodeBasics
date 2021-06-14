const express = require("express")
require('dotenv').config();
var mongoose = require('mongoose');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MONGODB_ATLAS_PASSWORD = process.env.MONGODB_ATLAS_PASSWORD


const app = express();
app.set("view engine","ejs") // views
app.use(express.static("public"));

// app.use(express.urlencoded({extended: true}));
app.use(express.json());


//Database Setup

//Set up default mongoose connection
var mongoDB = `mongodb+srv://admin:${MONGODB_ATLAS_PASSWORD}@cluster0.cydnc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

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
    res.render("index.ejs",{"greeting":"Hola"})
})


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

app.get("/read",(req,res)=>{
    res.send("Hola")
})


app.listen(3000,()=>"listing on port 3000....")