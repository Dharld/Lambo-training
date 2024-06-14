import supabase from "../utils/connectSupabase";

const createPaymentIntent = async ({ email, amount, userId, courseId }) => {
  try {
    const res = await fetch(`/api/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount,
        courseId,
        userId,
      }),
    });

    if (!res.ok) {
      return { success: false, error: "Error creating payment intent" };
    }

    const data = await res.json();

    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

const getAllPayment = async () => {
  try {
    const res = await supabase.rpc("get_all_payments");
    if (res.error) {
      return { success: false, error: res.error.message };
    }
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export default { createPaymentIntent, getAllPayment };
