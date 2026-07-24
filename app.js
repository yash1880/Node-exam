require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

const app = express();

const PORT = process.env.PORT || 3000;


// View Engine
app.set("view engine", "ejs");
app.set('views', './views');


// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.use('/', require('./routes/mainRoutes'));
app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/recipeRoutes'));
app.use('/', require('./routes/commentRoutes'));


// Server Start
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
};

startServer();