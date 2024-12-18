import { usePathname } from "next/navigation"

type Page = "AUTOMATIONS" | "CONTACTS" | "INTEGRATIONS" | "SETTINGS" | "HOME"

export const usePaths = () => {
  const pathname = usePathname()
  const path = pathname.split("/")
  let pages = path[path.length - 1] as Page
  return { pages, pathname }
}
