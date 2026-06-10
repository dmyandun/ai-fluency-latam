import type { NextConfig } from 'next'

const isDevelopment = process.env.NODE_ENV === 'development'

const baseSecurityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const productionSecurityHeaders = [
  ...baseSecurityHeaders,
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://assets.calendly.com",
      "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
      "img-src 'self' data: https://*.calendly.com",
      "font-src 'self'",
      "connect-src 'self' https://calendly.com https://*.calendly.com",
      "frame-src https://calendly.com https://*.calendly.com",
      "frame-ancestors 'self' https://huggingface.co",
    ].join('; '),
  },
]

const securityHeaders = isDevelopment ? baseSecurityHeaders : productionSecurityHeaders

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
