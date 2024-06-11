import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

if (process.env.NODE_ENV !== "production") {
  import("dotenv")
    .then((dotenv) => {
      dotenv.config();
    })
    .catch((err) => {
      console.error("Failed to load dotenv", err);
    });
}

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function handler(event, context) {
  let paymentIntent;
  let paymentId;
  const { email, amount, userId, courseId } = JSON.parse(event.body);
  try {
    const { error, data } = await supabase.rpc("create_payment", {
      p_user_id: userId,
      p_course_id: courseId,
      p_amount: amount,
      p_status: "PENDING",
    });

    if (error) {
      throw new Error(error.message);
    }

    paymentId = data.payment_id;

    paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      receipt_email: email,

      metadata: {
        payment_id: paymentId,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentId,
      }),
    };
  } catch (error) {
    if (paymentIntent) {
      await stripe.paymentIntents.cancel(paymentIntent.id);
    }
    if (paymentId) {
      // Delete the Supabase payment record
      await supabase.from("Payment").delete().eq("payment_id", paymentId);
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

export { handler };
