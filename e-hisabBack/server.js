require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { connectMongo } = require("./config/connection");
const userRouter = require("./routes/User");
const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const cartRouter = require("./routes/cart");
const stripeRouter = require("./routes/stripe");

const port = process.env.PORT;
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const errorMessage = err.message || "Internal server error";
  res.status(status).send(errorMessage);
});

app.use("/api/auth", userRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/cart", cartRouter);
app.use("/api/payment", stripeRouter);

connectMongo();

app.listen(port, () => {
  console.log(`The port is listing at ${port}`);
});
