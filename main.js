const mongoose = require("mongoose");
const express  = require("express");
const bodyParser = require("body-parser")

app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(bodyParser);

const URI = "mongodb+srv://qb:rootqb@files-cluster.xdcz95b.mongodb.net/messagesbase?retryWrites=true&w=majority";
const ID = "369"

//[Mongoose Schema]
const MESSAGE = mongoose.model("Message", new mongoose.Schema({
    _id: String,
    data: String
}));

app.post('/m', (request, response) => {
    console.log(request);
})


app.listen(3000,() => {
    console.log("Listening...");
})