import "./globals.css"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { ClientLayout } from "@/components/layout/client-layout"
import { ViewportProvider } from "@/components/layout/viewport-provider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ScienceMaterial — Junior Secondary Science",
  description: "Science learning platform with structured course material, interactive experiments, quizzes and progress tracking.",
  openGraph: {
    title: "ScienceMaterial — Junior Secondary Science",
    description: "Learn science by seeing how it works. Interactive labs, structured curriculum, quizzes and progress.",
    type: "website",
  },
  icons: {
    icon: "/logo.svg",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ViewportProvider />
        <ThemeProvider>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
