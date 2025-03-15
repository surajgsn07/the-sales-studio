const {Router} = require("express")
const { addCoupons , getAllCoupons , toggleAvailability , updateCoupon} = require("../controllers/coupon.controller.js")
const router = Router();

router.post("/add", addCoupons);
router.get("/all", getAllCoupons);
router.get("/toggle/:couponId", toggleAvailability);
router.put("/update/:couponId", updateCoupon);

module.exports = router