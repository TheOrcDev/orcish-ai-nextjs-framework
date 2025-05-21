"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Stripe from "stripe";

import { Tokens } from "@/components/shared/types";
import db from "@/db/drizzle";
import { purchases, tokenSpends } from "@/db/schema";
import { auth } from "@/lib/auth";
import { getTotalTokens } from "@/lib/queries";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

const priceMap = {
  [Tokens.TEN]: 1,
  [Tokens.FIFTY]: 3.5,
  [Tokens.HUNDRED]: 6,
};

const getTokenByPrice = (price: number) => {
  for (const [key, value] of Object.entries(priceMap)) {
    if (value === price) {
      return key;
    }
  }
  return Tokens.TEN;
};

export async function getTokens() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  try {
    const totalUserTokens = await getTotalTokens(
      session?.user?.email!,
    );

    return totalUserTokens;
  } catch (e) {
    throw e;
  }
}

export async function getClientSecret(tokens: Tokens) {
  const price = priceMap[tokens];

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(price) * 100,
      currency: "USD",
    });

    return paymentIntent.client_secret;
  } catch (e) {
    throw e;
  }
}

export async function getPaymentIntent(
  paymentIntentId: string,
  paymentIntentSecret: string,
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      const [existingRecord] = await db
        .select()
        .from(purchases)
        .where(eq(purchases.paymentIntentSecret, paymentIntentSecret));

      if (existingRecord) {
        return existingRecord.amount;
      }

      const amountOfTokens = getTokenByPrice(paymentIntent.amount / 100);

      await db.insert(purchases).values({
        email: session?.user?.email!,
        paymentIntent: paymentIntentId,
        paymentIntentSecret: paymentIntentSecret,
        amount: +amountOfTokens,
      });

      // TODO: Send success email to this user
    }

    return paymentIntent.amount;
  } catch (e) {
    console.log(e);
  }
}

export async function spendTokens(
  amount: number,
  email: string,
  action: string,
) {
  try {
    await db.insert(tokenSpends).values({
      amount: amount,
      email: email,
      action: action,
    });
  } catch (e) {
    throw e;
  }
}
