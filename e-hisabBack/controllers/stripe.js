const stripe = require("stripe")(process.env.STRIPE_SECRET);

const checkout = async (req, res) => {
  const { products } = req.body;
  console.log("pro", products);
  const filteredProducts = products.filter(
    (product) => product.productId !== null
  );

  const lineItems = filteredProducts.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.productId.productName,
        images: [product.productId.imageUrl],
      },
      unit_amount: product.productId.price * 100,
    },
    quantity: product.quantity,
  }));
  console.log("items:", lineItems);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });
  console.log("session: ", session);
  res.json({ id: session.id, rediretUrl: session.url });
};

module.exports = { checkout };
