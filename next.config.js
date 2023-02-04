module.exports = {
  env: {
      DB_LOCAL_URI: 'mongodb://127.0.0.1:27017/bookit',
      DB_URI: '',

      STRIPE_API_KEY: '',
      STRIPE_SECRET_KEY: '',

      STRIPE_WEBHOOK_SECRET: '',

      CLOUDINARY_CLOUD_NAME: 'dxb4gek9t',
      CLOUDINARY_API_KEY: '517861677599238',
      CLOUDINARY_API_SECRET: '3f2a8OTskk-3gBKp7S_SX-OAxwQ',

      SMTP_HOST: "",
      SMTP_PORT: "",
      SMTP_USER: "",
      SMTP_PASSWORD: "",
      SMTP_FROM_EMAIL: "",
      SMTP_FROM_NAME: "",

      NEXTAUTH_URL: '',
  },
  images: {
      domains: ['a0.muscache.com', 'res.cloudinary.com'],
  },
}