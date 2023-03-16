/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  /** @type {import('next').NextConfig} */

  output: "standalone",

  env: {
    DB_LOCAL_URI: 'mongodb://127.0.0.1:27017/bookittest',
    DB_URI: '',
    


    CLOUDINARY_CLOUD_NAME: '',
    CLOUDINARY_API_KEY: '',
    CLOUDINARY_APISECRET: '',

    NEXTAUTH_URL: 'http://localhost:3000',
    NEXTAUTH_SECRET: '',
    
    SMTP_HOST: 'sandbox.smtp.mailtrap.io',
    SMTP_PORT: '2525',
    SMTP_USER: '',
    SMTP_PASS: '',
    SMTP_FROM_NAME: 'Bookit',
    SMTP_FROM_EMAIL: 'noreply@bootkit.com',

    STRIPE_API_KEY:'',

    
    STRIPE_SECRET_KEY:'sk_test_51MhWPKSIXSENGovqrLMdPFfNIRpcFEmFKcGEYSiu4Q1CFy2DvAEvQT6dITyHe8VJG998vjwfNaNlbW7v8E8fsTr600IlJvY46L',
    
     STRIPE_WEBHOOK_SECRET: 'whsec_28f782caa59003e6c39a8e42426e8bff8115e5eb7159ed3ab7ce09656df2f147',
          
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
