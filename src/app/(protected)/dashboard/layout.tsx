import { onBoardUser } from "@/actions/user"
import { redirect } from "next/navigation"
import React from "react"

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await onBoardUser()

  if (user.status === 200 || user.status === 201) {
    if (user.data && user.data.firstname && user.data.lastname) {
      return redirect(`/dashboard/${user.data.firstname}${user.data?.lastname}`)
    }
  }
  if (user.status === 500) {
    throw new Error("Internal Server Error")
  }
  return redirect("/sign-in")

}

export default DashboardLayout
