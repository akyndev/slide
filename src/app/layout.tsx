import ReactQueryProvider from "@/components/query-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Slide App",
  description: "Instagram Automations for dms and comments"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <ReactQueryProvider>
          <body className={cn("bg-background", jakarta.className)}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <>{children}</>
              <Toaster />
            </ThemeProvider>
          </body>
        </ReactQueryProvider>
      </html>
    </ClerkProvider>
  )
}
