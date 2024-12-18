CREATE TYPE "public"."integration_type_enum" AS ENUM('instagram');--> statement-breakpoint
CREATE TYPE "public"."listner_type_enum" AS ENUM('smart_ai', 'MESSAGE');--> statement-breakpoint
CREATE TYPE "public"."media_type_enum" AS ENUM('image', 'video', 'carosel_album');--> statement-breakpoint
CREATE TYPE "public"."subscripton_plan_enum" AS ENUM('pro', 'free');--> statement-breakpoint
CREATE TABLE "automations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar,
	"name" varchar DEFAULT 'untitled',
	"active" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "automations_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "dms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"MESSAGE" varchar,
	"reciever" varchar,
	"senderId" varchar,
	"automation_id" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "dms_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "integrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar,
	"instagram_id" varchar(255),
	"expiresAt" date,
	"token" text,
	"name" "integration_type_enum",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "integrations_id_unique" UNIQUE("id"),
	CONSTRAINT "integrations_instagram_id_unique" UNIQUE("instagram_id")
);
--> statement-breakpoint
CREATE TABLE "keywords" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"word" varchar(255),
	"automation_id" varchar,
	CONSTRAINT "keywords_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "listners" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"prompt" varchar,
	"comment_reply" varchar,
	"dmsCount" integer DEFAULT 0,
	"commentCount" integer DEFAULT 0,
	"automation_id" varchar,
	CONSTRAINT "listners_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"posts_id" varchar,
	"caption" varchar,
	"media" varchar,
	"media_type" "media_type_enum" DEFAULT 'image',
	"automation_id" varchar,
	CONSTRAINT "posts_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer_id" varchar,
	"user_id" varchar,
	"plan" "subscripton_plan_enum",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "subscriptions_id_unique" UNIQUE("id"),
	CONSTRAINT "subscriptions_customer_id_unique" UNIQUE("customer_id")
);
--> statement-breakpoint
CREATE TABLE "triggers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" varchar,
	"automation_id" varchar,
	CONSTRAINT "triggers_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerkId" text,
	"email" varchar(255) NOT NULL,
	"first_name" varchar(256),
	"last_name" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_clerkId_unique" UNIQUE("clerkId"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
