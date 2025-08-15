import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Instituto Stellas | Do trauma à transformação',
    template: '%s | Instituto Stellas'
  },
  description: 'Instituto Stellas oferece apoio e transformação para famílias afetadas pela violência de gênero e feminicídio. Do trauma à transformação: um caminho possível com apoio.',
  keywords: ['instituto stellas', 'feminicídio', 'violência de gênero', 'apoio', 'transformação', 'Brasil'],
  authors: [{ name: 'Instituto Stellas' }],
  creator: 'Instituto Stellas',
  publisher: 'Instituto Stellas',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://institutostellas.com.br',
    title: 'Instituto Stellas | Do trauma à transformação',
    description: 'Instituto Stellas oferece apoio e transformação para famílias afetadas pela violência de gênero e feminicídio.',
    siteName: 'Instituto Stellas',
    images: [{
      url: '/assets/logo-og.png',
      width: 1200,
      height: 630,
      alt: 'Instituto Stellas - Do trauma à transformação',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instituto Stellas | Do trauma à transformação',
    description: 'Instituto Stellas oferece apoio e transformação para famílias afetadas pela violência de gênero e feminicídio.',
    images: ['/assets/logo-og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico?v=3',
    shortcut: '/favicon.ico?v=3',
    apple: '/favicon.ico?v=3',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}