import Stripe from "stripe";

import { currentUser } from "@clerk/nextjs/server";

const STRIPE_API_VERSION = "2024-06-20";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
    apiVersion: STRIPE_API_VERSION,
});

import { Tokens } from "@/components/shared/types";
import db from "@/db/drizzle";
import { purchases, tokenSpends } from "@/db/schema";
import { getTotalTokens } from "@/lib/queries";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

const priceMap = {
    [Tokens.TEN]: 1,
    [Tokens.FIFTY]: 3.5,
    [Tokens.HUNDRED]: 6
};

const getTokenByPrice = (price: number) => {
    for (const [key, value] of Object.entries(priceMap)) {
        if (value === price) {
            return key;
        }
    }
    return Tokens.TEN;
}

export const tokensRouter = router({
    getTokens: publicProcedure.query(async () => {
        const user = await currentUser();

        try {
            const totalUserTokens = await getTotalTokens(user?.emailAddresses[0].emailAddress!);

            return totalUserTokens;
        } catch (e) {
            throw (e);
        }
    }),
    getClientSecret: publicProcedure
        .input(
            z.object({ tokens: z.nativeEnum(Tokens) })
        )
        .mutation(async (opts) => {
            const { input } = opts;

            const price = priceMap[input.tokens];

            try {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: Number(price) * 100,
                    currency: "USD",
                });

                return paymentIntent.client_secret;
            } catch (e) {
                throw (e);
            }
        }),
    getPaymentIntent: publicProcedure.input(
        z.object({ paymentIntent: z.string(), paymentIntentSecret: z.string() })
    )
        .mutation(async (opts) => {
            try {
                const { input } = opts;
                const user = await currentUser();

                const paymentIntent = await stripe.paymentIntents.retrieve(input.paymentIntent);

                if (paymentIntent.status === "succeeded") {
                    const [existingRecord] = await db.select().from(purchases).where(eq(purchases.paymentIntentSecret, input.paymentIntentSecret));

                    if (existingRecord) {
                        console.log("Already saved");
                        return existingRecord.amount;
                    }

                    const amountOfTokens = getTokenByPrice(paymentIntent.amount / 100);

                    await db.insert(purchases).values({
                        email: user?.emailAddresses[0].emailAddress!,
                        paymentIntent: input.paymentIntent,
                        paymentIntentSecret: input.paymentIntentSecret,
                        amount: +amountOfTokens
                    });

                    // TODO: Send success email to this user
                }

                return paymentIntent.amount;
            } catch (e) {
                console.log(e)
            }
        }),
    spendTokens: publicProcedure
        .input(
            z.object({ amount: z.number(), email: z.string().email(), action: z.string() })
        )
        .mutation(async (opts) => {
            const { input } = opts;

            try {
                await db.insert(tokenSpends).values({
                    amount: input.amount,
                    email: input.email,
                    action: input.action
                });
            } catch (e) {
                throw (e);
            }
        }),
})
