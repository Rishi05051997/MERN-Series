const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const userCtrl = require("./../controllers/userController")

//// Here we are using body parser because as we are are getting data from client either from postman or react. So, we need to parse that data 
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false}));

/// here we are making authentication middleware
// var jwtAuth = (req, res, next) => {
//     var token = req.headers.authorization;
//     token = token.split(" ")[1];
//     jwt.verify(token, process.env.SECRETE_KEY, function(err, decoded){
//         if(err){
//             return res.status(301).json({"message":"Invalid Token"});
//         } else {
//             next();
//         }
//     })
// }



var passport = require('passport');
require("../config/passport")(passport)


router.get('/', (req, res)=> {
    res.send('Users router');
});

router.get('/list',passport.authenticate('jwt', {session:false}), userCtrl.userList);
router.post('/add', userCtrl.userAdd);
router.post('/login', userCtrl.userLogin);

module.exports = router;