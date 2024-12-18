"use server"

import { generateTokens } from "@/lib/fetch"
import axios from "axios"
import { redirect } from "next/navigation"
import { onCurrentUser } from "../user"
import { createIntegration, getIntegration } from "./queries"

export const onOAuthInstagram = async (strategy: "instagram" | "crm") => {
  if (strategy === "instagram") return redirect(process.env.INSTAGRAM_EMBEDDED_OAUTH_URL as string)
}

export const onIntegrate = async (code: string) => {
  const user = await onCurrentUser()
  try {
    const integration = await getIntegration(user.id)
    if (integration) {
      const token = await generateTokens(code)

      if (token) {
        const insta_id = await axios.get(
          `${process.env.INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${token.access_token}`
        )

        const today = new Date()
        const expire_date = today.setDate(today.getDate() + 60)
        const create = await createIntegration(
          user.id,
          token.access_token,
          new Date(expire_date),
          insta_id.data.user_id
        )
        if (create) return { status: 200, data: create }
      }
      return { status: 401 }
    }
    return { status: 404 }
  } catch (error) {
    console.error(error)
    return {
      status: 500
    }
  }
}
