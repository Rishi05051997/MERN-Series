const Users = require("./../models/userModel");
var bcrypt = require("bcryptjs");

const userList = async(req, res) => {
    let data = await Users.find();
    res.json(data);
}

const userAdd = async(req, res) => {
    
    console.log(req.body)
    let { name,email,phone,password } = req.body;

    let data = new Users({name,email,phone,password});
    let dbEntry = await data.save();
    let myToken = await data.getAuthToken()
    res.status(200).json({"message":"ok", data:myToken});
}

const userLogin = async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if(!email || !password){
        return res.status(301).json({"message":"Both email & Password is required"});
    }
    let user = await Users.findOne({'email':email})
    if(user){
        
        let match = await bcrypt.compare(password, user.password);
        if(match){
            let myToken = await user.getAuthToken()
            return res.status(200).json({"message":"Login Successfully !!!!", "token":myToken});
        }else {
            return res.status(301).json({"message":"Password is incorrect"});
        }
    }else {
        return res.status(301).json({"message":"User does not exist !!!"});
    }
    res.status(200).json({"message":"ok"});
}

module.exports = {
    userList,
    userAdd,
    userLogin
};