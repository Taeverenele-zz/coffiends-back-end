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
    success_url: "http://localhost:3000/payment/success",
    cancel_url: "http://localhost:3000/payment/cancel"
  });

  res.json({ id: session.id });
};

// in CLI type: stripe listen --forward-to http://localhost:5000/checkout/webhook
const webhook = async (request, response) => {
  let event;

  try {
    event = request.body;
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!');
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!');
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.json({received: true});
};

module.exports = { checkout, webhook };
