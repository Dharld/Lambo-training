import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

// Conditionally load dotenv in non-production environments
if (process.env.NODE_ENV !== "production") {
  import("dotenv")
    .then((dotenv) => {
      dotenv.config();
    })
    .catch((err) => {
      console.error("Failed to load dotenv", err);
    });
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function handler({ body, httpMethod, headers }) {
  if (httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  const sig = headers["stripe-signature"];
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("⚠️  Webhook signature verification failed.", err.message);
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    };
  }

  // Handle the event
  switch (stripeEvent.type) {
    case "payment_intent.succeeded":
      const paymentIntent = stripeEvent.data.object;
      const { payment_id } = paymentIntent.metadata;

      // Sync the database
      await supabase.rpc("confirm_payment", {
        p_payment_id: payment_id,
      });

      break;
    default:
      console.log(`Unhandled event type ${stripeEvent.type}`);
  }

  // Return a response to acknowledge receipt of the event
  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  };
}
