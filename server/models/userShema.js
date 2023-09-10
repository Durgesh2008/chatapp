const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        require:true,
        min:3,max:20,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        min:5
    },avtarImage:{
        type:String,
      
    },isavtarImageset:{
        type:Boolean,
        default:false
    }
    
}

);
module.exports=mongoose.model("Users",userSchema);