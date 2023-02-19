/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    DB_LOCAL_URI: 'mongodb://127.0.0.1:27017/bookittest',
    CLOUDINARY_CLOUD_NAME: 'dxb4gek9t',
    CLOUDINARY_API_KEY: '517861677599238',
    CLOUDINARY_APISECRET: '3f2a8OTskk-3gBKp7S_SX-OAxwQ',

    NEXTAUTH_URL: 'http://127.0.0.1:3000',
    NEXTAUTH_SECRET: '68=UrQZkm2=nSKJMn5*P5qxqU=hrETtXAvzrL#hhjQyp?wE%Z',
    
    SMTP_HOST: 'sandbox.smtp.mailtrap.io',
    SMTP_PORT: '2525',
    SMTP_USER: '0449cabf15d1eb',
    SMTP_PASS: '63868fd7fa6cf5',
    SMTP_FROM_NAME: 'Bookit',
    SMTP_FROM_EMAIL: 'noreply@bootkit.com',

    STRIPE_API_KEY:
      'pk_live_51L9jGFSJgzXB8D3o8sFkpSoLWGLjO7p1nCYUjQ8qkdnQOs9Pg0Gd5003kjNWGaWKcBsmINk6G6B7h5eTtcTOV4Tv00fBXwsIqL',
    STRIPE_SECRET_KEY:
      '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',
          STRIPE_WEBHOOK_SECRET: 'whsec_VNldn1kZxEJc1hYieeYYBP3rhkhKxbVL',
          
  },
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
  },
}
module.exports = nextConfig

// mongodb+srv://vaib1343:1343@cluster0.nyght.mongodb.net/?retryWrites=true&w=majority

// CLOUDINARY_CLOUD_NAME: 'dxb4gek9t',
// CLOUDINARY_API_KEY: '517861677599238',
// CLOUDINARY_API_SECRET: '3f2a8OTskk-3gBKp7S_SX-OAxwQ',
