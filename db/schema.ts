import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const purchases = pgTable("purchases", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull(),
    paymentIntent: text("payment_intent").notNull(),
    paymentIntentSecret: text("payment_intent_secret").notNull().unique(),
    amount: integer("amount").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const tokenSpends = pgTable("token_spends", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull(),
    action: text("action").notNull(),
    amount: integer("amount").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});
