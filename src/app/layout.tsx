import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import './globals.css'
import db from '@/lib/supabase/db'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/lib/Providers/next-theme-provider'
import { AppStateProvider } from '@/lib/Providers/state-provider'
import { SubscriptionModalProvider } from '@/lib/Providers/supabase-user-provider'

const lexend = Lexend({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Context by Khyal AI',
  description: 'A Productivity Platform For Developers',
}


export default function RootLayout({
  children, 
}: {
  children: React.ReactNode
}) {
  console.log(db)
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
      </head>
      <body className={cn(lexend.className, 'antialiased  min-h-screen border-none outline-none', 'scrollbar scrollbar-thumb scrollbar-thumb-white scrollbar-track-slate-700 bg-gradient-to-br from-rose-400 to-orange-300 dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900 dark:to-violet-600')} suppressHydrationWarning={true}>
            <ThemeProvider 
            attribute="class"
            defaultTheme="System"
            enableSystem
            disableTransitionOnChange>
              <AppStateProvider>
              <SubscriptionModalProvider>
              {children}
              </SubscriptionModalProvider>
              </AppStateProvider>
            </ThemeProvider>
      </body>
    </html>
  )
}
