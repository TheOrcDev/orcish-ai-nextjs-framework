"use client";

import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import getStripe from "@/lib/stripe";
import PaymentForm from "./payment-form";

import { trpc } from "@/server/client";

import { Tokens } from "@/components/shared/types";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Loading,
} from "@/components/ui";
import { CheckCircledIcon } from "@radix-ui/react-icons";

interface Props {
  email: String;
}

export default function BuyTokens({ email }: Props) {
  const stripePromise = getStripe();
  const createClientSecret = trpc.tokens.getClientSecret.useMutation();

  const [paymentIntentSecret, setPaymentIntentSecret] = useState("");
  const [showPayment, setShowPayment] = useState<boolean>(false);
  const [bundle, setBundle] = useState<Tokens>(Tokens.FIFTY);

  const buyTokens = async () => {
    const clientSecret = await createClientSecret.mutateAsync({
      tokens: bundle,
    });
    setPaymentIntentSecret(clientSecret);
    setShowPayment(true);
  };

  return (
    <>
      {!showPayment && !createClientSecret.isPending && (
        <>
          <div className="flex gap-5">
            <Card
              className={`h-96 w-72 cursor-pointer ${
                bundle === Tokens.TEN ? "bg-orange-800" : ""
              }`}
              onClick={() => setBundle(Tokens.TEN)}
            >
              <CardHeader>
                <CardTitle>Cheapest</CardTitle>
                <CardDescription>1$</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1">
                  <CheckCircledIcon className="size-5" /> 10 tokens
                </div>
              </CardContent>
            </Card>

            <Card
              className={`h-96 w-72 cursor-pointer ${
                bundle === Tokens.FIFTY ? "bg-orange-800" : ""
              }`}
              onClick={() => setBundle(Tokens.FIFTY)}
            >
              <CardHeader>
                <CardTitle>Efficent</CardTitle>
                <CardDescription>3.5$</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1">
                  <CheckCircledIcon className="size-5" /> 50 tokens
                </div>
              </CardContent>
            </Card>

            <Card
              className={`h-96 w-72 cursor-pointer ${
                bundle === Tokens.HUNDRED ? "bg-orange-800" : ""
              }`}
              onClick={() => setBundle(Tokens.HUNDRED)}
            >
              <CardHeader>
                <CardTitle>Best Deal</CardTitle>
                <CardDescription>6$</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1">
                  <CheckCircledIcon className="size-5" /> 100 tokens
                </div>
              </CardContent>
            </Card>
          </div>
          <Button variant={"outline"} size={"lg"} onClick={buyTokens}>
            Continue
          </Button>
        </>
      )}

      {createClientSecret.isPending && <Loading />}

      {paymentIntentSecret && showPayment && (
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
