const { notFound, errorHandler} = require("./middlewares/errorMiddleware");
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();


//middleware
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT;

//routes
app.use("/api", authRoutes);

//error handler
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
});
