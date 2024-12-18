import { getAllAutomations, getAutomationInfo } from "@/actions/automations"
import { onUserInfo } from "@/actions/user"
import { QueryClient, QueryFunction } from "@tanstack/react-query"

const prefetch = async (client: QueryClient, queryFunction: QueryFunction, key: string) => {
  await client.prefetchQuery({
    queryKey: [key],
    queryFn: queryFunction,
    staleTime: 60000
  })
}

export const prefetchUserProfile = async (client: QueryClient) => {
  await prefetch(client, onUserInfo, "user-info")
}

export const prefetchUserAutomation = async (client: QueryClient) => {
  await prefetch(client, getAllAutomations, "user-automations")
}

export const prefetchUserAutomationInfo = async (client: QueryClient, id: string) => {
  await prefetch(client, () => getAutomationInfo(id), "automation-info")
}