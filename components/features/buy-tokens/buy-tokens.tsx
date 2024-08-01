"use client";

import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import getStripe from "@/lib/stripe";
import PaymentForm from "./payment-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui";

interface Props {
  email: String;
}

export default function BuyTokens({ email }: Props) {
  const stripePromise = getStripe();
  const [paymentIntentSecret, setPaymentIntentSecret] = useState("");
  const [bundle, setBundle] = useState<10 | 50 | 100>(50);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        body: JSON.stringify({ amount: 1 }),
      });
      const data = await response.json();
      const { clientSecret } = data;
      setPaymentIntentSecret(clientSecret);
    };

    getClientSecret();
  }, []);

  return (
    <>
      <div className="flex gap-5">
        <Card>
          <CardHeader>
            <CardTitle>10 Tokens</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>50 Tokens</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>100 Tokens</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>

      {paymentIntentSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentSecret,
          }}
        >
          <PaymentForm email={email} />
        </Elements>
      )}
    </>
  );
}
