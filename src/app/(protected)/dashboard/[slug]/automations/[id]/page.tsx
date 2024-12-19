import { getAutomationInfo } from "@/actions/automations"
import { AutomationStoreProvider } from "@/components/automation-provider"
import AutomationsBreadCrumb from "@/components/global/automation-bread-crumbs"
import PostNode from "@/components/global/post-node"
import ThenNode from "@/components/global/then-node"
import Trigger from "@/components/global/trigger"
import { Warning } from "@/icons"
import { prefetchUserAutomationInfo } from "@/lib/prefetch"

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const info = await getAutomationInfo(params.id)
  return {
    title: info.data?.name
  }
}

const AutomationPage = async ({ params }: Props) => {
  const query = new QueryClient()
  await prefetchUserAutomationInfo(query, params.id)

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className=" flex flex-col items-center gap-y-20">
        <AutomationsBreadCrumb id={params.id} />
        <div className="w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
          <div className="flex gap-x-2">
            <Warning />
            When...
          </div>
          <AutomationStoreProvider>
            <Trigger id={params.id} />
          </AutomationStoreProvider>
        </div>
        <ThenNode id={params.id} />
        <PostNode id={params.id} />
      </div>
    </HydrationBoundary>
  )
}

export default AutomationPage
