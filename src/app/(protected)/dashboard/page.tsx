"use client"
import { useUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { useEffect } from "react"

const DashboardLayout = () => {
  const { isSignedIn, user } = useUser()

  useEffect(() => {
    if (isSignedIn) {
      redirect(`/dashboard/${user?.firstName}${user?.lastName}`)
    }

    if (!isSignedIn) redirect("/sign-in")
  })

  return (
    <div className="flex items-center justify-center">
      <p>redirecting...</p>
    </div>
  )
}

export default DashboardLayout
