const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const passport=require("passport");
const app=express();
app.get('/', (req, res) => res.send('Hello Worlds!'));

//DB config
const db=require("./config/key").mongoURI;

//引入users
const users=require("./router/api/users");

//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

//passport 初始化
app.use(passport.initialize());
require("./config/passport")(passport);
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
//调用users
app.use("/api/users",users);