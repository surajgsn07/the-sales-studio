const Coupon = require("../models/coupon.js");


// ✅ Admin: Add Coupons
exports.addCoupons = async (req, res) => {
  try {
    const { codes } = req.body; // Array of coupon codes
    const newCoupons = codes.map((code) => ({ code }));
  
    await Coupon.insertMany(newCoupons);
    res.status(201).json({ message: "Coupons added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error adding coupons" });
  }
};

// ✅ Admin: View All Coupons
exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ error: "Error fetching coupons" });
  }
};


exports.toggleAvailability = async(req,res)=>{
    try {
        const { couponId } = req.params;
        const coupon = await Coupon.findById(couponId);
        if (!coupon) {
          return res.status(404).json({ error: "Coupon not found" });
        }
        coupon.isAvailable = !coupon.isAvailable;
        await coupon.save();
        res.json({ message: "Coupon availability toggled successfully" });
      } catch (err) {
        res.status(500).json({ error: "Error toggling coupon availability" });
      }
}

exports.updateCoupon = async (req, res) => {
    try {
      const { couponId } = req.params;
      const { code , isClaimed} = req.body;
      

      const coupon = await Coupon.findById(couponId);
      if (!coupon) {
        return res.status(404).json({ error: "Coupon not found" });
      }
  
      coupon.code = code;
      if(!isClaimed){
        coupon.isClaimed = false
        coupon.claimedByIp = null
      }
      
      await coupon.save();
  
      res.json({ message: "Coupon updated successfully" });
    } catch (err) {
      res.status(500).json({ error: "Error updating coupon" });
    }
  };