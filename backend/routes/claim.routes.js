const express = require("express");
const { claimCoupon , getAllCoupons } = require("../controllers/claim.controller.js");
const abusePrevention = require("../middlewares/abusePrevention.js");
const { verifyJwt } = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.post("/claim", abusePrevention, claimCoupon);
router.get("/all", verifyJwt,getAllCoupons);

module.exports = router;
