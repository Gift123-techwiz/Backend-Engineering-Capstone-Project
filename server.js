const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const User = require("./models/user");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();


//middleware
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT;

app.get("/", (req, res)=>{
    res.json({message: "VaultPass API running"});
})

//routes
app.use("/api", authRoutes);

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
});
