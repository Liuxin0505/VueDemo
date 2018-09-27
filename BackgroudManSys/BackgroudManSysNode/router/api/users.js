//login & register
const express=require("express");
const bcrypt=require("bcryptjs");
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router=express.Router();
const User=require("../../models/User");
const key=require("../../config/key");

// $router GET api/users/test
//@desc 返回请求的json数据
//@access public
router.get("/test",(req,res)=>{
    res.json({msg:"uesrs works"});
});

// $router POST api/users/register
//@desc 返回请求的json数据
//@access public
router.post("/register",(req,res)=>{
   // console.log(req.body);
    //查看数据库中用户是否已被注册
    User.findOne({email:req.body.email})
        .then((user)=>{
            if(user){
                return res.status(400).json({email:"邮箱已被注册"})
            }
            else {
                const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
                const newUser=new User({
                    name:req.body.name,
                    email:req.body.email,
                    avatar:avatar,
                    password:req.body.password
                })
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, function(err, hash) {
                        if(err)throw err;
                        newUser.password=hash;
                        newUser.save()
                            .then(user=>{
                                res.json(user)
                            })
                            .catch(err=>{
                                console.log(err)
                            })
                    });
                });
            }
        })
})

// $router POST api/users/login
//@desc 返回token jwt passport
//@access public
router.post("/login",(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    //查询数据库
    User.findOne({email:email})
        .then((user)=>{
            if(!user){
                return res.status(400).json({email:"用户不存在"})
            }
            //匹配密码
            bcrypt.compare(password, user.password).then(isMatch => {
                if(isMatch){
                    // res.json({msg:"success"});
                    // jwt.sign("规则","加密名字","过期时间","箭头函数")
                    const rule={id:user.id,name:user.name}
                    jwt.sign(rule,key.secretOrKey,{expiresIn:3600},(err,token)=>{
                        if(err)throw err;
                        res.json(
                            {
                                success:true,
                                token:"Bearer "+token
                            }
                        )
                    })
                }
                else {
                    return res.status(400).json({password:"密码错误"});
                }
            });
        })
})

// $router GET api/users/current
//@desc 返回current user
//@access private
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
res.json({
    id:req.user.id,
    name:req.user.name,
    email:req.user.email
})
})
module.exports=router;