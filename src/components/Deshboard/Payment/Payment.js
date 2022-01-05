import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51JvxegJEUT7RuCbtLoHEEh39vPICVKIR5clZ6nD0meI1Aa2zambO4vfyzQXo2yF30cOuMi1egLzPy0WQLk9ep8gd00HyXygTre"
);

const Payment = () => {
  const { paymentId } = useParams();
  console.log(paymentId)
  const [orders, setOrders] = useState({});
  console.log(orders);

  useEffect(() => {
    fetch(
      `https://dry-shelf-35127.herokuapp.com/my-orders/${paymentId}`
    )
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [paymentId]);

  return (
    <div style={{marginTop: "5%"}}>
      <h2>
        Please pay for : {orders.name} for {orders.email}
      </h2>
      <h2>Pay: ${orders.Price}</h2>

      {orders?.Price && (
        <Elements stripe={stripePromise}>
          <CheckoutForm orders={orders} />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
