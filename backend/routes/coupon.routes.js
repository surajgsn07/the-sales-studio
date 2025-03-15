const {Router} = require("express")
const { addCoupons , getAllCoupons , toggleAvailability , updateCoupon} = require("../controllers/coupon.controller.js")
const router = Router();
const {verifyJwt} = require("../middlewares/auth.middleware.js")

router.post("/add",verifyJwt, addCoupons);
router.get("/all", getAllCoupons);
router.get("/toggle/:couponId", verifyJwt, toggleAvailability);
router.put("/update/:couponId",verifyJwt, updateCoupon);

module.exports = router