"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button, Loading } from "@/components/ui";
import { trpc } from "@/server/client";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const [paymentIntentData, setPaymentIntentData] = useState<number | null>(
    null,
  );

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

      setPaymentIntentData(data!);
    };

    getData();
    // Disabling ESLint warning - Hooks cannot go in here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      {getPaymentIntent.isLoading && <Loading />}

      {paymentIntentData && (
        <div className="flex flex-col items-center justify-center gap-5">
          <h2>You have successfully payed {paymentIntentData / 100}$!</h2>
          <Link href={"/"}>
            <Button>Go and use your tokens!</Button>
          </Link>
        </div>
      )}
    </main>
  );
}
