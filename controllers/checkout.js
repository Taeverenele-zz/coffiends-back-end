const stripe = require("stripe")(process.env.STRIPE_API_KEY);

const checkout = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: req.body.email,
    line_items: [
      {
        price_data: {
          currency: "aud",
          product_data: {
            name: req.body.coffee,
          },
          unit_amount: (req.body.total * 100),
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.BACK_END_URL}/orders/success/?user=${req.body.user}&cafe=${req.body.cafe}&coffee=${req.body.coffee}&size=${req.body.size}&milk=${req.body.milk}&sugar=${req.body.sugar}&time=${req.body.pickup_time}&total=${req.body.total}`,
    cancel_url: process.env.FRONT_END_URL
  });

  res.json({ id: session.id });
};

module.exports = { checkout };