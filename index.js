const fs = require("fs");
const express = require("express");

const mongoose = require("mongoose");
const app = express();

const URI = "mongodb+srv://qb:rootqb@files-cluster.xdcz95b.mongodb.net/messagesbase?retryWrites=true&w=majority";
const ID = "369"
const MESSAGE = mongoose.model("Message", new mongoose.Schema({
    _id: String,
    data: String
}));

function getter() {
    MESSAGE.find({_id: ID}, (err, data) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log(data)
            fs.appendFile("./history.txt", Date.now() + String(data[0].data), (err) => {
                console.log(err)
            });
            fs.writeFile("./messages.txt", String(data[0].data), (err) => {
                if(err) throw err;
            return data[0];
            });
        }
        console.log("[DATA SENT]")
    });
}

let data = getter();
console.log(data);
mongoose.connect(URI,() => {console.log("[Base Connected]");});

app.all('/', (req, res) => {
        console.log("[REQUEST RECIEVED]");
        res.sendFile(__dirname + "/messages.txt");
    })

app.listen(process.env.PORT || 3000);
 
