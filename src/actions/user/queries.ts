"use server"

import { db } from "@/db"
import { subscriptions, users } from "@/db/schema"
import { eq } from "drizzle-orm"

export const findUser = async (clerkId: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, clerkId),
    with: {
      subscription: true,
      integrations: true
    }
  })

  return user
}

export const createUser = async (clerkId: string, firstName: string, lastName: string, email: string) => {
  return await db
    .insert(users)
    .values({
      clerkId,
      firstName,
      lastName,
      email
    })
    .returning({
      firstname: users.firstName,
      lastname: users.lastName
    })
}

export const updateSubscription = async (userId: string, props: { customerId?: string; plan?: "pro" | "free" }) => {
  return await db.insert(subscriptions).values({
    customerId: props.customerId,
    plan: props.plan,
    userId
  })
}
