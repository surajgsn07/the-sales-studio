const express = require("express");
const { claimCoupon } = require("../controllers/claim.controller.js");
const abusePrevention = require("../middlewares/abusePrevention.js");

const router = express.Router();

router.post("/claim", abusePrevention, claimCoupon);

module.exports = router;
