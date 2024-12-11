import '@/styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Card Scanner App',
  description: 'Scan and validate cards easily',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@9.0.2/dist/dbr.js"></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

