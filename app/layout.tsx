import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AhorrarT - Educación Financiera y Gestión de Ahorros",
  description: "Aprende a manejar tu dinero de forma inteligente con AhorrarT",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
