import InfoBar from "@/components/global/infobar"
import Sidebar from "@/components/global/sidebar"
import { prefetchUserAutomation, prefetchUserProfile } from "@/lib/prefetch"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import React from "react"

type Props = {
  children: React.ReactNode
  params: { slug: string }
}

const DashboardLayout = async ({ children, params: { slug } }: Props) => {
  //TODO: use tanstack query for caching and other stuff

  const client = new QueryClient()
  await prefetchUserProfile(client)
  await prefetchUserAutomation(client)

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <div>
        {/* TODO: Add a sidebar  */}
        <div className="p-3">
          <Sidebar slug={slug} />
          <div
            className="
      lg:ml-[250px] 
      lg:pl-10 
      lg:py-5 
      flex 
      flex-col 
      overflow-auto
      "
          >
            <InfoBar slug={slug} />
            {children}
          </div>
        </div>
      </div>
    </HydrationBoundary>
  )
}

export default DashboardLayout
