const mongoose= require("mongoose");
require('dotenv').config()

const uri=process.env.URI;
const connectionParams={ 
   useNewUrlParser: true, 
   useUnifiedTopology: true
} 

const ConnectToMongoose=async()=>{
   const conn= await mongoose.connect(uri,connectionParams);
   if(conn){
    console.log('coonect successfully')
   }
}

module.exports=ConnectToMongoose;