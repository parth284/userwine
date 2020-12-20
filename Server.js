const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const axios = require("axios");


const app = express();
const PORT = 8080;

const mongoURl = "mongodb+srv://<YOURID>:<YOUR_PASSWORD>@cluster0.9fb3w.mongodb.net/myData?retryWrites=true&w=majority || 'mongodb://localhost/myData'"
mongoose.connect(mongoURl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected",()=>{
    console.log("mongoose connected");
});

const Schema = mongoose.Schema;
const newData = new Schema({
    drinks: [],
    user: []
})


const data = mongoose.model("data", newData);

data.deleteMany({}).then(function(){ 
        console.log("Data deleted"); // Success 
    }).catch(function(error){ 
        console.log(error); // Failure 
    }); 




const lode = async () => {
    const drinks = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    
    const user = await axios.get("https://randomuser.me/api/");

    // setDatas(datas=>[ ...datas, {drinks:data.drinks[0],
    //         user:user.data.results[0]}]);


    const something = {drinks:drinks.data.drinks[0],
        user:user.data.results[0]};

    // console.log(something)

    const datass = new data(something);

    datass.save((error)=>{
        if(error){
            console.log("error");
        }else{
            console.log("data saved")
        }
    })
}

lode();
setInterval(() => {
    lode();
}, 15000);


app.use(morgan("tiny"));
app.get('/api',(req, res)=>{
    data.find({})
        .then((data)=>{
            res.json(data);
        })
        .catch(()=>{
            console.log("error from loding data")
        })
});

if(process.env.NODE_ENV === "production"){
    app.use(express.static('userWine/build'))
}

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.listen(PORT, console.log("server"))


//npm run dev
