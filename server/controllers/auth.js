//=============Imports_START=============//

const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');
require('../config/passportLocalConfig')(passport);
//=============Imports_END=============//

//=============Register a user=============//
exports.userRegister =  (req,res,next)=>{
    const {email,password} = req.body; 
    User.findOne({email:email}, async (err,doc)=>{
        if(err) throw err;
        if(doc) return res.send('User already exists');
        if(!doc){
        console.log(email,password);
        const hashedPwd = await bcrypt.hash(password,10);
        const user = new User({email:email,password:hashedPwd});
        await user.save();
        console.log("USER IS CREATED!!");
        res.json({email:email,password:password});
        }  
    });
}

exports.userLogin = (req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        //console.log(info);
        if(err) {return res.json({message:err});}
        if(!user) { return res.json({message:"no such user"});}
        else{
            req.logIn(user,error=>{
                if (error) { res.json({message:error});}
                console.log(req.user);
                return res.json({message:"Authenticated"}); 
            })
        }
})(req,res,next);
}