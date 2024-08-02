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
  CardFooter,
  CardHeader,
  CardTitle,
  Loading,
} from "@/components/ui";

import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

export default function BuyTokens() {
  const stripePromise = getStripe();
  const createClientSecret = trpc.tokens.getClientSecret.useMutation();

  const { resolvedTheme } = useTheme();

  const [paymentIntentSecret, setPaymentIntentSecret] = useState("");
  const [showPayment, setShowPayment] = useState<boolean>(false);

  const buyTokens = async (bundle: Tokens) => {
    const clientSecret = await createClientSecret.mutateAsync({
      tokens: bundle,
    });

    if (!clientSecret) {
      console.log("No client secret");
      return;
    }

    setPaymentIntentSecret(clientSecret);
    setShowPayment(true);
  };

  return (
    <>
      {!showPayment && !createClientSecret.isPending && (
        <>
          <div className="grid w-full gap-5 md:grid-cols-2 lg:grid-cols-3 lg:px-20">
            <Card className="cursor-pointer transition duration-300 ease-in-out">
              <CardHeader>
                <CardTitle>Cheapest</CardTitle>
                <CardDescription>1$</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1">
                  <CheckCircledIcon className="size-5" /> 10 tokens
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => buyTokens(Tokens.TEN)}>
                  Get 10 Tokens
                </Button>
              </CardFooter>
            </Card>

            <Card className="cursor-pointer transition duration-300 ease-in-out">
              <CardHeader>
                <CardTitle>Efficent</CardTitle>
                <CardDescription>3.5$</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1">
                  <CheckCircledIcon className="size-5" /> 50 tokens
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => buyTokens(Tokens.FIFTY)}>
                  Get 50 Tokens
                </Button>
              </CardFooter>
            </Card>

            <Card className="cursor-pointer transition duration-300 ease-in-out">
              <CardHeader>
                <CardTitle>Best Deal</CardTitle>
                <CardDescription>6$</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1">
                  <CheckCircledIcon className="size-5" /> 100 tokens
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => buyTokens(Tokens.HUNDRED)}>
                  Get 100 Tokens
                </Button>
              </CardFooter>
            </Card>
          </div>
        </>
      )}

      {createClientSecret.isPending && <Loading />}

      {paymentIntentSecret && showPayment && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentSecret,
            appearance: {
              theme: resolvedTheme === "dark" ? "night" : "flat",
            },
          }}
        >
          <PaymentForm back={() => setShowPayment(false)} />
        </Elements>
      )}
    </>
  );
}
