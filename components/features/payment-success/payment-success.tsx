"use client";

import { Loading } from "@/components/ui";
import { trpc } from "@/server/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Stripe from "stripe";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const [paymentIntentData, setPaymentIntentData] =
    useState<Stripe.PaymentIntent>();

  const getPaymentIntent = trpc.tokens.getPaymentIntent.useMutation();

  const paymentIntent = searchParams.get("payment_intent");
  const paymentIntentSecret = searchParams.get("payment_intent_client_secret");

  useEffect(() => {
    const getData = async () => {
      if (!paymentIntent || !paymentIntentSecret) {
        return;
      }
      const data = await getPaymentIntent.mutateAsync({
        paymentIntent,
        paymentIntentSecret,
      });
      console.log(data);
      setPaymentIntentData(data);
    };

    getData();
    // Disabling ESLint warning - Hooks cannot go in here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentIntent, paymentIntentSecret]);

  return (
    <main>
      {getPaymentIntent.isPending && <Loading />}

      {paymentIntentData && (
        <h2>You have successfully payed {paymentIntentData.amount / 100}$!</h2>
      )}
    </main>
  );
}
