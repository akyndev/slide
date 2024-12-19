import { onBoardUser } from "@/actions/user"

const DashboardPage = async () => {
  await onBoardUser()
  return <div className="flex items-center justify-center h-screen">Dashboard Redirecting...</div>
}

export default DashboardPage
