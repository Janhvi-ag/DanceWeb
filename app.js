const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
const bodyParser = require("body-parser");
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactD');

}
const port = 80;

// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  const Contact = mongoose.model('Contact', contactSchema);
  

app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params)
});

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params)
});

app.get('/about', (req, res)=>{
    const params = {}
    res.status(200).render('about.pug', params)
});

app.get('/service', (req, res)=>{
    const params = {}
    res.status(200).render('service.pug', params)
});

app.get('/info', (req, res)=>{
    const params = {}
    res.status(200).render('info.pug', params)
});


app.post('/contact', async (req, res)=>{
    const formData = req.body;

    //Create a new contact instance 
    const newContact = new Contact(formData);

    try{
        //Save the contact to the database
        const savedContact = await
        newContact.save();
        console.log('Submitted Data:', savedContact);
        res.send('Form submitted successfully');
    }catch(error){
        console.error('Error saving contact:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});