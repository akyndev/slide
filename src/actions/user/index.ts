"use server"

import { currentUser } from "@clerk/nextjs/server"

import { refreshToken } from "@/lib/fetch"
import { redirect } from "next/navigation"
import Stripe from "stripe"
import { getIntegration, updateIntegration } from "../integrations/queries"
import { createUser, findUser, updateSubscription } from "./queries"

export const onCurrentUser = async () => {
  const user = await currentUser()
  if (!user) return redirect("/sign-in")

  return user
}

export const onBoardUser = async () => {
  const user = await onCurrentUser()
  try {
    const existingUser = await findUser(user.id)
    if (existingUser) {
      const integration = await getIntegration(user.id)
      if (integration) {
        const today = new Date()
        const time_left = integration.expiresAt
          ? new Date(integration.expiresAt).getTime() - today.getTime()
          : new Date().getTime()

        const days = Math.round(time_left / (1000 * 3600 * 24))
        if (days < 5) {
          console.log("refresh")

          const refresh = await refreshToken(integration.token!)

          const today = new Date()
          const expire_date = today.setDate(today.getDate() + 60)

          const update_token = await updateIntegration(refresh.access_token, new Date(expire_date), integration.id)
          if (!update_token) {
            console.log("Update token failed")
          }
        }
      }
    } else {
      await createUser(user.id, user.firstName!, user.lastName!, user.emailAddresses[0].emailAddress)
    }
  } catch (error) {
    console.log(error)
  }
  redirect(`dashboard/${user.firstName}${user.lastName}`)
}

export const onUserInfo = async () => {
  const user = await onCurrentUser()
  try {
    const profile = await findUser(user.id)
    if (profile) return { status: 200, data: profile }

    return { status: 404 }
  } catch (error) {
    return { status: 500 }
  }
}

export const onSubscribe = async (session_id: string) => {
  const stripe = new Stripe(process.env.STRIPE_CLIENT_SECRET as string)

  const user = await onCurrentUser()
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)
    if (session) {
      const subscribed = await updateSubscription(user.id, {
        customerId: session.customer as string,
        plan: "pro"
      })

      if (subscribed) return { status: 200 }
      return { status: 401 }
    }
    return { status: 404 }
  } catch (error) {
    return { status: 500 }
  }
}
