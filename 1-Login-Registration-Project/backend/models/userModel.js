const mongoose = require('mongoose');
const conn = require("./../config/db");
var bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');



var userSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    password:{
        type:String,
        select:true
    },
    tokens:[
       {
           token:{
               type:String,
               required: true
           }
       } 
    ]
},{
    timestamps:true
});
///// .pre method is helpfull for changing some data format before storing to the database. So, here we dcrypted password and save it into a database ... Here we used one bcryptjs library for bcrypting password 
userSchema.pre('save', function(next) {
    var salt = bcrypt.genSaltSync(10);
    if(this.password && this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, salt);
    }
    next();
})
userSchema.methods.getAuthToken = async function(data) {
    let params = {
        id:this._id,
        email:this.email,
        phone:this.phone
    }
    var tokenValue = jwt.sign(params, process.env.SECRETE_KEY, {expiresIn:"300000s"});
    this.tokens = this.tokens.concat({token:tokenValue})
    await this.save();
    return tokenValue
}
let users = conn.model('users', userSchema);

module.exports = users;