const express = require('express')
const mongoose = require("mongoose");
const app = express()

const URI = "mongodb+srv://qb:rootqb@files-cluster.xdcz95b.mongodb.net/messagesbase?retryWrites=true&w=majority";
const ID = "369"
const MESSAGE = mongoose.model("Message", new mongoose.Schema({
    _id: String,
    data: String
}));

mongoose.connect(URI,() => {
    console.log("[base connected]");
    http();
});

function find() {
    MESSAGE.find({_id: ID}, (err, data) => {
        if(err) {
            console.log(err);
        }
        else {
            return(data[0].data);
        }
    });
}

function http() {
    app.all('/', (req, res) => {
        console.log("Just got a request!")
        res.send(find())
    })
    app.listen(process.env.PORT || 3000)
}





















// app.all('/', (req, res) => {
//     console.log("Just got a request!")
//     res.send(respone)
// })
// app.listen(process.env.PORT || 3000)
// console.log("Listening for requests...");
