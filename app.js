const express=require("express")
const app=express()
const path=require("path")
const fs=require("fs")
const bodyparser=require("body-parser")
const port=80;


//Mongoose
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/KDA_Database');
}
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
})
const contact = mongoose.model('contact',ContactSchema);


// EXPRESS RELATED
app.use('/static', express.static('static'))   //For serving static file
app.use(express.urlencoded())   //to get stored data
// PUG RELATED
app.set('view engine', 'pug')    //set template engine as pug
app.set("views", path.join(__dirname, 'views'))  //Set the view directiory


//Our pug demo endpoint
app.get('/', (req, res) => {
    const con = ""
    const kunal = { "title": "Dance_Studio", "content": con }
    res.status(200).render('home.pug', kunal)
})
app.get('/contact', (req, res) => {
    const con = ""
    const kunal = { "title": "Dance_Studio", "content": con }
    res.status(200).render('contact.pug', kunal)
})
app.post('/contact', (req, res) => {
    var myData= new contact(req.body);
    myData.save().then(()=>{
        res.send("This data has been saved in db")
    }).catch(()=>{
        res.status(400).send("not saved")
    });
    
})





//START THE SERVER
app.listen(port, () => {
    console.log(`Now your are using post: ${port}`)
})