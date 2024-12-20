"use server"

import { db } from "@/db"
import { automations, dms, keywords, listeners, posts, triggers } from "@/db/schema"
import { and, AnyColumn, asc, eq, sql } from "drizzle-orm"

const increment = (column: AnyColumn, value = 1) => {
  return sql`${column} + ${value}`
}

export const createChatHistory = async (automationId: string, sender: string, reciever: string, message: string) => {
  return db.insert(dms).values({
    automationId,
    senderId: sender,
    reciever,
    message
  })
}

export const getChatHistory = async (recieverId: string, senderId: string) => {
  const history = await db.query.dms.findMany({
    where: and(eq(dms.senderId, senderId), eq(dms.reciever, recieverId)),
    orderBy: [asc(dms.createdAt)]
  })
  const chatSession: {
    role: "assistant" | "user"
    content: string
  }[] = history.map((chat) => {
    return {
      role: chat.reciever ? "assistant" : "user",
      content: chat.message!
    }
  })

  return {
    history: chatSession,
    automationId: history[history.length - 1].automationId
  }
}

export const getKeywordAutomation = async (automationId: string, dm: boolean) => {
  return db.query.automations.findFirst({
    where: eq(automations.id, automationId),
    with: {
      dms: true,
      triggers: {
        where: dm ? eq(triggers.type, "dm") : eq(triggers.type, "comment")
      },
      listener: true,
      user: {
        with: {
          subscription: {
            columns: {
              plan: true
            }
          },
          integrations: {
            columns: {
              token: true
            }
          }
        }
      }
    }
  })
}

export const getKeywordPost = async (postId: string, automationId: string) => {
  const post = await db.query.posts.findFirst({
    where: and(eq(posts.postId, postId), eq(posts.automationId, automationId)),
    columns: {
      automationId: true
    }
  })
  return post
}

export const matchKeyword = async (keyword: string) => {
  return await db.query.keywords.findFirst({
    where: eq(keywords.word, keyword)
  })
}

export const trackResponses = async (automationId: string, type: "dm" | "comment") => {
  if (type === "comment") {
    return await db
      .update(listeners)
      .set({
        commentCount: increment(listeners.commentCount)
      })
      .where(eq(listeners.automationId, automationId))
  }
  if (type === "dm") {
    return await db
      .update(listeners)
      .set({
        dmsCount: increment(listeners.dmsCount)
      })
      .where(eq(listeners.automationId, automationId))
  }
}

export const createTransaction = async (
  automationId: string,
  sender: string,
  reciever: string,
  text: string,
  content: string
) => {
  console.log(text, "&", content)
  await db.transaction(async () => {
    await createChatHistory(automationId, sender, reciever, text),
      await createChatHistory(automationId, sender, reciever, content)
  })
  console.log("TRANSACTION CREATED!!!")
}
