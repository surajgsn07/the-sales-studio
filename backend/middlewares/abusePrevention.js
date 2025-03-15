const Claim = require("../models/claim.js");

const abusePrevention = async (req, res, next) => {
  try {
    const userIP = req.ip;
    const {userSession} = req.body // Use User-Agent as fallback
    const cooldownPeriod = 5 * 60 * 1000; // 5 minutes

    if (!userSession) {
      return res.status(400).json({ error: "Session not found. Please enable cookies." });
    }

    // 🛑 Step 1: Check if the IP has claimed within the last 5 minutes
    const lastClaim = await Claim.findOne({
      ip: userIP,
      claimedAt: { $gt: new Date(Date.now() - cooldownPeriod) }, // Only check recent claims
    });

    if (lastClaim) {
      return res.status(429).json({
        error: "You can only claim a coupon once every 5 minutes.",
      });
    }

    // 🛑 Step 2: Check if the session already exists (BLOCK IMMEDIATELY)
    const existingSession = await Claim.findOne({ sessionId: userSession });

    if (existingSession) {
      return res.status(429).json({
        error: "This session has already claimed a coupon.",
      });
    }

    next(); // Proceed to claim the coupon
  } catch (err) {
    console.error("Abuse Prevention Error:", err);
    res.status(500).json({ error: "Error checking claim history" });
  }
};

module.exports = abusePrevention;
