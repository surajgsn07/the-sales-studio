const Claim = require("../models/claim.js");
const Coupon = require("../models/coupon.js");

const claimCoupon = async (req, res) => {
  try {
    const userIP = req.ip;
    const {userSession} = req.body; 

    console.log({userIP , userSession})

    // ✅ Step 1: Find the next available coupon (Round-Robin)
    const coupon = await Coupon.findOne({ isClaimed: false , isAvailable: true }).sort({ createdAt: 1 });

    if (!coupon) {
      return res.status(400).json({ error: "No available coupons at the moment" });
    }

    // ✅ Step 2: Store claim record
    const claim = await Claim.create({
      couponId: coupon._id,
      ip: userIP,
      sessionId: userSession,
    });

    await Coupon.findByIdAndUpdate(coupon._id, { isClaimed: true , claimedByIp: userIP});

    res.status(200).json({ message: "Coupon claimed successfully!", couponCode: coupon.code, claim });
  } catch (err) {
    res.status(500).json({ error: "Error claiming coupon" });
  }
};

const getAllCoupons = async (req, res) => {
  try {
    const claims = await Claim.find().populate("couponId");
    res.json(claims);
  } catch (err) {
    res.status(500).json({ error: "Error fetching coupons" });
  }
}
module.exports = { claimCoupon , getAllCoupons};
