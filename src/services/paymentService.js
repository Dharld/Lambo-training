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

export { createPaymentIntent };
