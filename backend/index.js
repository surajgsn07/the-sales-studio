const express = require("express");
const app = express();
const connectDB = require("./db/index.js");
const dotenv = require("dotenv");
const cors = require("cors");

app.use(cors(
    {
        origin: "https://the-sales-studio.netlify.app",
        
        // origin: "http://localhost:5173",
        methods: ["GET", "POST" , "PUT" , "DELETE"],
        credentials: true
    }
))
dotenv.config();

app.use(express.json());
connectDB();

const userRoutes = require("./routes/user.routes.js");
const claimRoutes = require("./routes/claim.routes.js");
const couponRoutes = require("./routes/coupon.routes.js");
app.use("/user", userRoutes);
app.use("/claim", claimRoutes);
app.use("/coupon", couponRoutes);

app.listen(3000, () => {
    console.log("Server started on port 3000");
});