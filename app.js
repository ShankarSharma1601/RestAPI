require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./database/connect");

const PORT = process.env.PORT || 5000;

const products_route = require("./routes/products");

app.get("/", (req, res) => {
  res.send(`Hi, I am live `);
});

// middleware
app.use("/api/products", products_route);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`${PORT} I am connected`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
