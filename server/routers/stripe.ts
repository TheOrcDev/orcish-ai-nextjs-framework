import { NextResponse } from "next/server";
import Stripe from "stripe";

const STRIPE_API_VERSION = "2024-06-20";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
    apiVersion: STRIPE_API_VERSION,
});

import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const tokensRouter = router({
    createPaymentIntent: publicProcedure
        .input(
            z.object({ amount: z.number() })
        )
        .mutation(async (opts) => {
            const { input } = opts;

            try {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: Number(input.amount) * 100,
                    currency: "USD",
                });

                return new NextResponse(
                    JSON.stringify({ clientSecret: paymentIntent.client_secret }),
                    {
                        status: 200, headers: { 'Content-Type': 'application/json' }
                    });
            } catch (error: any) {
                return new NextResponse(JSON.stringify(
                    { error: error.message }),
                    { status: 400, headers: { 'Content-Type': 'application/json' } }
                );
            }
        })
})
