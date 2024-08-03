CREATE TABLE IF NOT EXISTS "purchases" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"payment_intent" text NOT NULL,
	"payment_intent_secret" text NOT NULL,
	"amount" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "purchases_email_unique" UNIQUE("email")
);
