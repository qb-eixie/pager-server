//[dependecies]
const express = require('express');
const fs = require("fs");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

//[middelware funtions]
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
mongoose.set('strictQuery', true)

const URI = "mongodb+srv://qb:rootqb@files-cluster.xdcz95b.mongodb.net/messagesbase?retryWrites=true&w=majority";
const ID = "369"

//[Mongoose Schema]
const MESSAGE = mongoose.model("Message", new mongoose.Schema({
    _id: String,
    data: String
}));

//[Establishing Connection with ATLAS.]
mongoose.connect(URI,() => {
    console.log("[ATLAS CONNECTED]"); 
});

app.get('/m', (request, response) => {
        const msg = MESSAGE.find({_id: ID});
        msg.then(data => {
        response.send(data[0].data);
    })
})

app.post('/', (req, res) => {
    const formData = String(req.body.msg);
    console.log("Response:"+ formData);
    MESSAGE.replaceOne({_id: ID}, {data: formData}, (a) => {
        if(a) {
            console.log(a);
        }
    })
    res.sendFile(__dirname + "/public/index.html");
});



app.listen(3000, () => {
    console.log("[LISTENTING]");
});



