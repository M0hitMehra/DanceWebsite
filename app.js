const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/contactDance');
}

const port = process.env.PORT || 5000;

const contact = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
    
});

const Contact = mongoose.model('contact', contact);


app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', "pug");
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    const param = {};
    res.status(200).render('home.pug', param);
});

app.get('/contact', (req, res) => {
    const param = {};
    res.status(200).render('contact.pug', param)
});

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() =>{
        
        res.status(200).render('sent.pug');
    }).catch(()=>{
        res.status(400).send("NOT SEND")
    })
});



app.listen(port, () => {
    console.log(`${port}`);
});
