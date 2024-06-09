const express=require('express');
const fs=require('fs');
const path=require('path');
const app=express();
const port=8000;
const bodyparser=require("body-parser");

// var mongoose=require('mongoose');
// mongoose.connect('mongodb://localhost/Contactdance');
// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
await mongoose.connect('mongodb://localhost/contactdance');

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


//define mongoose schema
const contactschema = new mongoose.Schema({
    name: String,
    Phone:String,
    email:String,   
    address:String
  });

const contact = mongoose.model('contact', contactschema);  




//app.use(express.static('static',options));

app.use('/static',express.static('static'))
app.use(express.urlencoded());

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'))

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get("/contact", (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
});

app.post("/contact", (req, res)=>{
    var myData =new contact(req.body);
    myData.save().then(()=>{
        res.send("this is item is saved")
    }).catch(()=>{
        res.status(400).send("Item was not saved")
    });
    // res.status(200).render('contact.pug', params);
});

app.get("/Services", (req, res)=>{
    const params = {}
    res.status(200).render('services.pug', params);
});


app.listen(port, ()=>{
    console.log(`Website application ka port ${port}`);
});