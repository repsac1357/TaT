//use all the node_modules. 
require('dotenv').config({path:__dirname+'/.env'});

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const log = console.log;
const app = express();
const path = require('path');

//open port (on localhost)
const PORT = 8080;

app.use(cors())

console.log("starting mail server")

// Data parsing
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json())

//You receive the data in this function, because we are using POST. 
app.post('/email', (req, res) => {
    //call the function in the server and pass the required values through.
    sendMail(req.body.email, req.body.uncheckedBoxes, req.body.checkedBoxes)
    res.json({ message: 'email verstuurd via post'})
})

//you don't need this in its current state, but if you need to send data through GET you will need this. 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
    console.log('get aangeroepen');
    res.json({ message: 'email sent via get'})
})

//actually start the serer. 
app.listen(PORT, () => log('server is starting on PORT: ', PORT))

//specifie what service you usem and give the account.
//the account is a gmail account for this project. 
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

function sendMail(email, dataW, dataR){
    //configure all the options, if you need more see the nodemailer documentation. 
    const options = {
        from: process.env.EMAIL,
        to: email,
        cc: "", //Hier moet het HR email adres komen waar de mail sowieso naar toe moet. 
        subject: "nodemailer test",
        text: 'Na het formulier dat je hebt ingevuld komen er de volgende dingen uit, dit doe je al goed: \r\n' + dataR + 
              '\r\n \r\n En dit kun je de volgende keer nog beter doen: \r\n' + dataW
    }
    
    //send the mail with the transporter, inculuding all the options and data. 
    transporter.sendMail(options, function (err, info) {
        if (err) {
            console.log(err)
            return
        } else {
            console.log('email sent!');
        }
        console.log("sent: " . info.response);
    })
}
