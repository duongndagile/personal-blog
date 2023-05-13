/** @type {import('next').NextConfig} */
const {i18n} = require('./next-i18next.config');

const nextConfig = {
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
  },
  GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
}

module.exports = nextConfig;