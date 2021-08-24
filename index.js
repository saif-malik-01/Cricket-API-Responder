const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const lives = require('./schemas/liveScoreSchema');
const scores = require('./schemas/cpltScoreSchema');
const details = require('./schemas/previewSchema');
const { response } = require('express');
const key = "mongodb+srv://saif:pcvirus0@test.yjqub.mongodb.net/Cricket-API?retryWrites=true&w=majority"

mongoose.connect(key,{useNewUrlParser:true,useUnifiedTopology:true},
    (err)=>{
        if(err)console.log(err);
        console.log("DB connected");
})

const app =  express();
app.get('/',async (req,res)=>{
    const {data} = await axios.get('https://cricket-fever-api.herokuapp.com/');
    if(/saif-malik/.test(data)) console.log("Cluster working");
    else {
        console.log("Problem with cluster");
        res.send("problem with cluster")
    } 
    const live = await lives.find({})
    const score = await scores.find({})
    const detail = await details.find({})
    const dbData = await Promise.all([detail,live,score])
    const responses = await handleData(dbData);
    res.send(responses);
})


async function handleData([details,lives,scores]){
    const detail = Array.from(details).map((ele)=>{ 
        delete ele._id;
        delete ele.__v;
        delete ele.match.id;
        return ele.match;
    })
    const live = Array.from(lives).map((ele)=>{ 
        delete ele._id;
        delete ele.__v;
        delete ele.match.id;
        return ele.match;
    })
    const score = Array.from(scores).map((ele)=>{ 
        delete ele._id;
        delete ele.__v;
        delete ele.match.id;
        return ele.match;
    })
   
    return {preview:detail,live,complete:score};
}

app.listen(process.env.PORT || 3000,()=>{
    console.log("API running");
})