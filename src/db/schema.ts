import { relations } from "drizzle-orm"
import { boolean, date, integer, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core"

export const timestamps = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow()
}

export const subscriptionsPlanEnum = pgEnum("subscripton_plan_enum", ["pro", "free"])
export const integrationsEnum = pgEnum("integration_type_enum", ["instagram"])
export const mediaTypeEnum = pgEnum("media_type_enum", ["image", "video", "carousel_album"])
export const listenersEnum = pgEnum("listener_type_enum", ["smart_ai", "message"])

export const users = pgTable("Users", {
  id: uuid().primaryKey().unique().defaultRandom().notNull(),
  clerkId: varchar("clerk_id").unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  firstName: varchar("first_name", { length: 256 }).unique().notNull(),
  lastName: varchar("last_name", { length: 256 }).unique().notNull(),
  ...timestamps
})

export const usersRelations = relations(users, ({ one, many }) => ({
  subscription: one(subscriptions),
  integrations: many(integrations),
  automations: many(automations),
}))

export const subscriptions = pgTable("Subscriptions", {
  id: uuid().primaryKey().unique().defaultRandom().notNull(),
  customerId: varchar("customer_id").unique(),
  userId: varchar("user_id"),
  plan: subscriptionsPlanEnum(),
  ...timestamps
})
export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, { fields: [subscriptions.userId], references: [users.clerkId] })
}))

export const integrations = pgTable("Integrations", {
  id: uuid().primaryKey().unique().defaultRandom().notNull(),
  userId: varchar("user_id"),
  instagramId: varchar("instagram_id", { length: 255 }).unique(),
  expiresAt: date("expires_at"),
  token: varchar(),
  name: integrationsEnum(),
  ...timestamps
})

export const integrationsRelations = relations(integrations, ({ one }) => ({
  user: one(users, {
    fields: [integrations.userId],
    references: [users.clerkId]
  })
}))

export const automations = pgTable("Automations", {
  id: uuid().primaryKey().unique().defaultRandom().notNull(),
  userId: varchar("user_id"),
  name: varchar().default("untitled"),
  active: boolean().default(false),
  listenerId: uuid(),
  ...timestamps
})

export const automationsRelations = relations(automations, ({ one, many }) => ({
  triggers: many(triggers),
  posts: many(posts),
  dms: many(dms),
  keywords: many(keywords),
  user: one(users, {
    fields: [automations.userId],
    references: [users.clerkId]
  }),
  listener: one(listeners, {
    fields: [automations.listenerId],
    references: [listeners.id]
  })
}))

export const dms = pgTable("Dms", {
  id: uuid().primaryKey().unique().defaultRandom().notNull(),
  message: varchar(),
  reciever: varchar(),
  senderId: varchar("sender_id"),
  automationId: uuid("automation_id"),
  ...timestamps
})

export const dmsRelations = relations(dms, ({ one }) => ({
  automation: one(automations, {
    fields: [dms.automationId],
    references: [automations.id]
  })
}))

export const posts = pgTable("Posts", {
  id: uuid().primaryKey().unique().defaultRandom().notNull(),
  postId: varchar("posts_id"),
  caption: varchar(),
  media: varchar(),
  mediaType: mediaTypeEnum("media_type").default("image"),
  automationId: uuid("automation_id")
})

export const postsRelations = relations(posts, ({ one }) => ({
  automation: one(automations, {
    fields: [posts.automationId],
    references: [automations.id]
  })
}))

export const listeners = pgTable("Listeners", {
  id: uuid().primaryKey().unique().defaultRandom().notNull(),
  prompt: varchar(),
  commentReply: varchar("comment_reply"),
  dmsCount: integer().default(0),
  commentCount: integer().default(0),
  automationId: uuid("automation_id"),
  listener: listenersEnum().default("message")
})

export const listnersRelations = relations(listeners, ({ one }) => ({
  automation: one(automations, {
    fields: [listeners.automationId],
    references: [automations.id]
  })
}))

export const triggers = pgTable("Triggers", {
  id: uuid().primaryKey().unique().defaultRandom().notNull(),
  type: varchar(),
  automationId: uuid("automation_id")
})

export const triggersRelations = relations(triggers, ({ one }) => ({
  automation: one(automations, {
    fields: [triggers.automationId],
    references: [automations.id]
  })
}))

export const keywords = pgTable("Keywords", {
  id: uuid().primaryKey().unique().defaultRandom().notNull(),
  word: varchar({ length: 255 }),
  automationId: uuid("automation_id")
})

export const keywordsRelations = relations(keywords, ({ one }) => ({
  automation: one(automations, {
    fields: [keywords.automationId],
    references: [automations.id]
  })
}))
