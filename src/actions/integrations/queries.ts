"use server"

import { db } from "@/db"
import { integrations, users } from "@/db/schema"
import { and, eq } from "drizzle-orm"

export const updateIntegration = async (token: string, expire: Date, id: string) => {
  return await db
    .update(integrations)
    .set({
      token,
      expiresAt: expire.toString()
    })
    .where(eq(integrations.id, id))
}

export const getIntegration = async (clerkId: string) => {
  return await db.query.integrations.findFirst({
    where: and(eq(integrations.userId, clerkId), eq(integrations.name, "instagram"))
  })
}

export const createIntegration = async (clerkId: string, token: string, expire: Date, igId?: string) => {
  await db.insert(integrations).values({
    token,
    expiresAt: expire.toString(),
    instagramId: igId,
    userId: clerkId
  })
  return await db.query.users.findFirst({
    where: eq(users.clerkId, clerkId),
    columns: {
      firstName: true,
      lastName: true
    }
  })
}
