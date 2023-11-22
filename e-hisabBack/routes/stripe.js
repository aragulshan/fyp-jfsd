const stripeRouter = require("express").Router();
const stripeController = require("../controllers/stripe");
const auth = require("../middlewares/auth");

stripeRouter.post("/checkout",stripeController.checkout);

module.exports = stripeRouter;