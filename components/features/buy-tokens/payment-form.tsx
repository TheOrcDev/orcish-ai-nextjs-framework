"use client";

import React from "react";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui";

interface Props {
  email: String;
}

export default function PaymentForm({ email }: Props) {
  const stripe = useStripe();
  const elements = useElements();

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/order-complete`,
      },
    });
    // TODO: Save tokens for this user in db
    // TODO: Send email to this user

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <PaymentElement options={{ layout: "accordion" }} />
      <Button type="submit">Buy Tokens</Button>
    </form>
  );
}
