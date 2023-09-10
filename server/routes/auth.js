const express=require('express')
require('dotenv').config()
const router = express.Router();
const User = require("../models/userShema");
const bcrypt = require('bcryptjs');
const  jwt = require('jsonwebtoken');
const fetchuser = require('../middlemare/fetchuser');
const JWT_SECRET = process.env.JWT_SECRET
// --------------------------Route1-----------------------------
//Create a user /api/auth/createuser ,No login Required
router.post('/createuser',async(req,res)=>{
  try {
    const {name,email,password}=req.body;
  if(!name|| !email || !password){
    return res.status(422).json({error:'please fill details',success:false})
  }
  
  const checkUser=await User.findOne({email:email})
  if(checkUser){
    return res.status(422).json({error:'user already exist',success:false})
  }
   //hash password
  const salt = await bcrypt.genSalt(10);
  let secpass = await bcrypt.hash(password, salt);
  
  const user=new User({name,email,password:secpass})
  const Save= await user.save();
  if(Save){
  
  const ID=user.id;
  const authtoken = jwt.sign(ID, JWT_SECRET);
    
  res.json({ success:true,token:authtoken,user})
  
  }
  } catch (error) {
    return res.status(500).json({message:error,success:false})
  }
})


// route 2 api/auth/login no login require
router.post('/login',async(req,res)=>{
try {
    const {email,password}=req.body;
    if( !email || !password){
      return res.status(422).json({error:'please fill details',success:false})
    }
    //email check
    const user=await User.findOne({email})
    if(!user){
      return res.status(422).json({error:'invalid user',success:false})
    }
//password check
    const passCheck= await bcrypt.compareSync(password,user.password);
    if( !passCheck){
      return res.status(422).json({error:'invalid user',success:false})
    }
    const ID=user.id;
    const authtoken = jwt.sign(ID, JWT_SECRET);
      
    res.json({ success:true,token:authtoken,user})
} catch (error) {
  return res.status(500).json({message:error,success:false})
}
})

// route 3 api/auth/getuser  login require
router.get('/getuser/:id',fetchuser,async(req,res)=>{
  // const token = req.header('auth-token');
  // console.log(token)
  try {
    const id=req.params.id;
    const user=await User.find({_id:{$ne:id}}).select([
      'name','avtarImage','email','_id'
  ])
    res.json({user,success:true})
  } catch (error) {
    res.json({success:false,meg:"user is not accessed"})
  }
})

router.post('/setavtar/:id',async(req,res)=>{
  try {
    const userid=req.params.id;
    const avtarImage=req.body.Image;
    const userdata=await User.findByIdAndUpdate(userid,{
      isavtarImageset:true,
      avtarImage
    })
    res.json({isset:userdata.isavtarImageset,image:avtarImage,success:true})
    
  } catch (error) {
    res.json({success:false,msg:"internal server error"})
  }
})
module.exports = router;