const express = require("express");
const app = express();
const connectToMongoDB = require("./database/connectToMongoDB");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;

require("dotenv").config();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "./public")));

//cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoutes);

const startServer = async () => {
  const chalk = (await import("chalk")).default;
  const port = process.env.PORT || 3000;
  const url = process.env.MONGO_URI.replace(
    "<db_password>",
    process.env.MONGO_PASSWORD
  );
  try {
    await connectToMongoDB(url);
    app.listen(port, () => {
      console.log(chalk.blue("✅ Connected to MongoDB successfully!"));
      console.log(chalk.yellow(`✅ Server is running on port ${port} `));
    });
  } catch (err) {
    console.error(chalk.red("🚨 Error connecting to MongoDB:", err.message));
    process.exit(1);
  }
};

startServer();
