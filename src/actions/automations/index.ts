"use server"

import { getIntegration } from "../integrations/queries"
import { onCurrentUser } from "../user"
import {
  activateAutomationQuery,
  addKeyword,
  addListener,
  addPost,
  addTrigger,
  createAutomation as createAutomationQuery,
  findAutomation,
  getAllAutomationsQuery,
  removeKeyword,
  updateAutomation
} from "./queries"

export const createAutomation = async () => {
  try {
    const create = await createAutomationQuery()
    if (create) return { status: 200, data: "automation created" }
    return { status: 400, data: "Oops! Failed to create automation" }
  } catch (error) {
    console.error(error)
    return { status: 500, data: "Internal Server Error" }
  }
}

export const getAllAutomations = async () => {
  const user = await onCurrentUser()
  try {
    const automations = await getAllAutomationsQuery(user.id)
    if (automations) return { status: 200, data: automations }
    return { status: 400, data: [] }
  } catch (error) {
    console.error(error)
    return { status: 500, data: [] }
  }
}

export const getAutomationInfo = async (id: string) => {
  try {
    await onCurrentUser()
    const automation = await findAutomation(id)
    if (automation)
      return {
        status: 200,
        data: automation
      }
    return {
      status: 404
    }
  } catch (error) {
    console.log(error)
    return {
      status: 500
    }
  }
}

export const updateAutomationName = async (id: string, { name, active }: { name?: string; active?: boolean }) => {
  try {
    await onCurrentUser()
    const automation = await updateAutomation(id, { name, active })
    if (automation)
      return {
        status: 200,
        data: "automation updated successfully"
      }
    return {
      status: 404
    }
  } catch (error) {
    console.log(error)
    return {
      status: 500
    }
  }
}

export const saveListener = async (
  automationId: string,
  listener: "smart_ai" | "message",
  prompt: string,
  reply?: string
) => {
  try {
    await onCurrentUser()
    const create = await addListener(automationId, listener, prompt, reply)
    if (create) return { status: 200, data: "listener added" }
    return { status: 400 }
  } catch (error) {
    console.error(error)
    return {
      status: 500
    }
  }
}

export const saveTrigger = async (automationId: string, trigger: string[]) => {
  try {
    await onCurrentUser()
    const create = await addTrigger(automationId, trigger)
    if (create) return { status: 200, data: "Trigger created" }
    return { status: 400 }
  } catch (error) {
    console.error(error)
    return {
      status: 500
    }
  }
}

export const saveKeyword = async (automationId: string, keyword: string) => {
  try {
    await onCurrentUser()
    const create = await addKeyword(automationId, keyword)
    if (create) return { status: 200, data: "Keyword created" }
    return { status: 400 }
  } catch (error) {
    console.error(error)
    return {
      status: 500
    }
  }
}

export const deleteKeyword = async (automationId: string) => {
  try {
    await onCurrentUser()
    const create = await removeKeyword(automationId)
    if (create)
      return {
        status: 200,
        data: "Keyword deleted"
      }
    return { status: 400 }
  } catch (error) {
    console.error(error)
    return {
      status: 500
    }
  }
}

export const activateAutomation = async (id: string, state: boolean) => {
  try {
    await onCurrentUser()
    const updatedAutomation = await activateAutomationQuery(id, state)
    if (updatedAutomation) return { status: 200, data: "Updated Automation" }
    return { status: 404 }
  } catch (error) {
    console.error(error)
    return { status: 500 }
  }
}

export const getProfilePosts = async () => {
  try {
    const user = await onCurrentUser()
    const integration = await getIntegration(user.id)
    const posts = await fetch(
      `${process.env.INSTAGRAM_BASE_URL}/me/media?fields=id,caption,media_url,media_type,timestamp&limit=10&access_token=${integration?.token}`
    )
    const parsed = await posts.json()
    if (parsed) return { status: 200, data: parsed }
    console.log("🔴 Error in getting posts")
    return { status: 404 }
  } catch (error) {
    console.log("🔴 server side Error in getting posts", error)
    return { status: 500 }
  }
}

export const savePosts = async (
  automationId: string,
  posts: {
    postId: string
    caption?: string
    media: string
    mediaType: "image" | "video" | "carousel_album"
  }[]
) => {
  const readyPosts = posts.map((post) => {
    return { ...post, automationId }
  })

  try {
    await onCurrentUser()
    const create = await addPost(readyPosts)
    if (create) return { status: 200, data: "Trigger created" }
    return { status: 400 }
  } catch (error) {
    console.error(error)
    return {
      status: 500
    }
  }
}
