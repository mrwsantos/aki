const withPWA = require('next-pwa')

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Permite importar vídeos
    config.module.rules.push({
      test: /\.(mp4|webm|ogg)$/i,
      type: 'asset/resource', // cria uma URL para o arquivo
    })
    return config
  },
}

module.exports = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})(nextConfig)
