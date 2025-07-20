import React from "react";

const PaymentButton = () => {
  const handlePayment = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/payment/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 500 }), // ₹500
      });

      const data = await res.json();

      if (!data.success || !data.order) {
        alert("Failed to create Razorpay order.");
        return;
      }

      const options = {
        key: "rzp_test_XXXXXXX",
        amount: data.order.amount,
        currency: data.order.currency,
        name: "My Project",
        description: "Test Transaction",
        order_id: data.order.id,
        handler: async function (response) {
          const verifyRes = await fetch("http://localhost:5000/api/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyRes.json();
          alert(verifyData.message);
        },
        prefill: {
          name: "Aryan Suryawanshi",
          email: "aryan@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error in payment:", error);
      alert("Payment failed to initiate.");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded"
    >
      Pay ₹500
    </button>
  );
};

export default PaymentButton;
