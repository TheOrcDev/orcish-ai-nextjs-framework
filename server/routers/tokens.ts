import Stripe from "stripe";

const STRIPE_API_VERSION = "2024-06-20";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
    apiVersion: STRIPE_API_VERSION,
});

import { Tokens } from "@/components/shared/types";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

const priceMap = {
    [Tokens.TEN]: 1,
    [Tokens.FIFTY]: 3.5,
    [Tokens.HUNDRED]: 6
};

export const tokensRouter = router({
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

                if (paymentIntent.status === "succeeded") {
                    // TODO: Save tokens for this user in db
                    // TODO: Send email to this user

                    return paymentIntent.client_secret;
                }
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
                return await stripe.paymentIntents.retrieve(input.paymentIntent);
            } catch (e) {
                console.log(e)
                throw (e);
            }
        }),
})
