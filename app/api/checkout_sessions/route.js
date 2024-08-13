import { NextResponse } from "next/server";
import Stripe from 'stripe';
//creating new object Stripe:
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
export async function POST(req) {
  // Create Checkout Sessions from body params.
  const formatAmountForStripe = (amount) => {
    return Math.round(ammount * 100)
  }
  const params = {
    submit_type: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          price_data: {
            name: 'Pro Subscription',

          },
          unit_amount: formatAmountForStripe(10),
          recurring: {
            interval: 'month',
            interval_count: 1,
          },
        },

        quantity: 1,
      },
    ],
    success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
  };
  const checkoutSession =
    await stripe.checkout.sessions.create(params);
  return NextResponse.json(checkoutSession, {
    status: 200,
  });
  // ...
}
