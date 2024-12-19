"use server"

import { db } from "@/db"
import { automations, keywords, listeners, posts, triggers } from "@/db/schema"
import { desc, eq } from "drizzle-orm"
import { onCurrentUser } from "../user"

export const createAutomation = async () => {
  const user = await onCurrentUser()
  return await db.insert(automations).values({
    userId: user.id
  })
}

export const getAllAutomationsQuery = async (clerkId: string) => {
  return await db.query.automations.findMany({
    where: eq(automations.userId, clerkId),
    with: {
      keywords: true,
      listener: true
    },
    orderBy: [desc(automations.createdAt)]
  })
}

export const findAutomation = async (automationId: string) => {
  return await db.query.automations.findFirst({
    where: eq(automations.id, automationId),
    with: {
      keywords: true,
      triggers: true,
      listener: true,
      posts: true,
      user: {
        with: {
          subscription: true,
          integrations: true
        }
      }
    }
  })
}

export const updateAutomation = async (automationId: string, { name, active }: { name?: string; active?: boolean }) => {
  return await db
    .update(automations)
    .set({
      name,
      active
    })
    .where(eq(automations.id, automationId))
}

export const addListener = async (
  automationId: string,
  listener: "message" | "smart_ai",
  prompt: string,
  reply?: string
) => {
  const data = await db
    .insert(listeners)
    .values({
      automationId: automationId,
      listener,
      prompt,
      commentReply: reply
    })
    .returning({
      id: listeners.id
    })
  await db
    .update(automations)
    .set({
      listenerId: data[0].id
    })
    .where(eq(automations.id, automationId))

  console.log(data)
  return data
}

export const addTrigger = async (automationId: string, trigger: string[]) => {
  if (trigger.length === 2) {
    return await db.insert(triggers).values([
      {
        automationId: automationId,
        type: trigger[0]
      },
      {
        automationId: automationId,
        type: trigger[1]
      }
    ])
  }
  return await db.insert(triggers).values({
    automationId: automationId,
    type: trigger[0]
  })
}

export const addKeyword = async (automationId: string, keyword: string) => {
  return await db.insert(keywords).values({
    automationId: automationId,
    word: keyword
  })
}

export const removeKeyword = async (automationId: string) => {
  return await db.delete(keywords).where(eq(keywords.automationId, automationId))
}

export const activateAutomationQuery = async (id: string, state: boolean) => {
  return await db
    .update(automations)
    .set({
      active: state
    })
    .where(eq(automations.id, id))
}

export const addPost = async (
  post: {
    automationId: string
    postId: string
    caption?: string
    media: string
    mediaType: "image" | "video" | "carousel_album"
  }[]
) => {
  return await db.insert(posts).values(post)
}
