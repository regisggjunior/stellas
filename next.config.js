/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  // Desabilitar indicadores de desenvolvimento
  devIndicators: {
    position: 'bottom-right',
  },
  // Configuração para remover indicadores visuais
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  },
}

export default nextConfig