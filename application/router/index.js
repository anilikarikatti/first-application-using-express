// const express = require('express');
const express = require('express');

const app = express();

const router = express.Router();


const ControllerUser = require('../controllers/register');

// console.log(registerUser.registerUser);

router.post("/registerUser",ControllerUser.registerUser);

router.post("/loginUser",ControllerUser.loginUser)

router.get("/logout",ControllerUser.logout);

    
module.exports = router;