const express = require("express");
const {getSessionId , registerUser , loginUser ,  } = require("../controllers/user.controller.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/sessionid' , getSessionId);
module.exports = router;
