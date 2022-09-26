// const express = require('express');
const express = require('express');

const app = express();

const router = express.Router();


const ControllerUser = require('../controllers/register');

const eventController = require('../controllers/events')

const eventDisplay = require('../controllers/events_display');
// console.log(registerUser.registerUser);

const eventRegister = require('../controllers/register_events')

router.post("/registerUser",ControllerUser.registerUser);

router.post("/loginUser",ControllerUser.loginUser)

router.get("/logout",ControllerUser.logout);

router.get("/event_types",eventController.event_types)

// router.get("/sports",)
router.get("/events_display",eventDisplay.events_display)


router.get('/register_events',eventRegister.register_events)

router.get("/cancelRegister",eventRegister.cancelRegister)
    
module.exports = router;