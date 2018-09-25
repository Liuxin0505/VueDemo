const express=require("express");
const mongoose=require("mongoose");
const app=express();
app.get('/', (req, res) => res.send('Hello Worlds!'));

//DB config
const db=require("./config/key").mongoURI;
//connect mongdb
mongoose.connect(db)
    .then(()=>{
        console.log("connect db successful")
    })
    .catch(()=>{
        console.log("connect db failed")
    })

const port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`server is running post ${port}`);
})
