//[dependecies]
const express = require('express');
const fs = require("fs");
// const mongoose = require("mongoose");
const bodyParser = require('body-parser');

//[middelware funtions]
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))



app.post('/', (req, res) => {
    const formData = req.body;
    fs.appendFile(__dirname + "/history.txt", formData.msg, (err) => {
        if(err) {
            console.log(err);
        }
    });
    console.log(formData);
    fs.writeFile("messages.txt", formData.msg, (err) => {
        if(err) {
            console.log(err);
        }
    });
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/messages', (request, response) => {
    response.sendFile(__dirname + "/messages.txt")
});

app.listen(3000, () => {
    console.log('LISTENTING');
});



// const URI = "mongodb+srv://qb:rootqb@files-cluster.xdcz95b.mongodb.net/messagesbase?retryWrites=true&w=majority";
// const ID = "369"
// //[Mongoose Schema]
// const MESSAGE = mongoose.model("Message", new mongoose.Schema({
//     _id: String,
//     data: String
// }));

//[Establishing Connection with ATLAS.]
// mongoose.connect(URI,() => {
//     console.log("[Base Connected]"); 
//     // postfn();
// });

// MESSAGE.find({_id: ID})
//     .then(err => {
//         if(err) {
    //             console.log(err);
    //         }})
    //     .then(data => {
        //             fs.appendFile("./history.txt", String(data), (err) => {
//                 if(err) {
//                     console.log(err)
//                 };
//             });
//             fs.watchFile("messages.txt")
//         })

