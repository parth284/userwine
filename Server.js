const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const axios = require("axios");
const { json } = require('express');


const app = express();
const PORT = 8080;

const mongoURl = "YOUR MONGODB URL"
mongoose.connect( mongoURl, {
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

const deleteData = ()=>{
    data.deleteMany({}).then(function(){ 
        console.log("Data deleted"); // Success 
    }).catch(function(error){ 
        console.log(error); // Failure 
    }); 
}

const lode = async () => {
    drinks=[];
    user=[];
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then((response)=>{drinks=response})
        .catch((error)=>{console.log("error in drinks api")});


    await axios.get("https://randomuser.me/api/")
        .then((response)=>{user=response})
        .catch((error)=>{console.log("error in users api")});


    if(drinks.data && user.data){
        const something = {drinks:drinks.data.drinks[0],
            user:user.data.results[0]};
    
        // console.log(something)
    
        const datass = new data(something);
        datass.save((error)=>{
            if(error){
                console.log(error);
            }else{
                console.log("data saved")
            }
        })
    }else{
        console.log("error in data save")
    }

    
}

lode();
deleteData();
setInterval(() => {
    lode();
}, 5000);


app.use(morgan("tiny"));
app.get('/api',(req, res)=>{
    data.find({})
        .then((data)=>{
            res.json(data);
            deleteData();
        })
        .catch(()=>{
            console.log("error from loding data")
        })
});

// if(process.env.NODE_ENV === "production"){
//     app.use(express.static('userWine/build'))
// }

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.listen(PORT, console.log(`localhost:${PORT}`))


//npm run dev