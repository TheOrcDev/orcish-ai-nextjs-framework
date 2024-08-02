"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { ArrowLeftIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui";

interface Props {
  back: () => void;
}

export default function PaymentForm({ back }: Props) {
  const stripe = useStripe();
  const elements = useElements();

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/order-complete`,
      },
    });
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <Button variant={"outline"} onClick={back}>
        <ArrowLeftIcon className="size-5" />
        Back
      </Button>
      <PaymentElement options={{ layout: "accordion" }} />
      <Button variant={"outline"} type="submit">
        Buy Tokens
      </Button>
    </form>
  );
}
