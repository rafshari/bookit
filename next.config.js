/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    DB_LOCAL_URI: 'mongodb://127.0.0.1:27017/bookittest',
    DB_URI: 'mongodb+srv://roozbeh123:roozbeh123@cluster0.skexl.mongodb.net/bookit?retryWrites=true&w=majority',
    
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

    STRIPE_API_KEY:'pk_test_51MhFY5HykZY2WQaMq0hQpup2FCyTk2FFJnGXEfAPsDPEo5DoSNhi379On06vsnnYJY0rWSuGyylB8FqXQw4G4SF100UvYBboXj',
      
    STRIPE_SECRET_KEY:'sk_test_51MhFY5HykZY2WQaMxauvJJYYdjHrRkshXYpub8mdrnCTe5zunQiJR0aAC4nmLYc9d8nPm6QPCjbZ4x0mS3s3ad8O00iva5sTDW',
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
