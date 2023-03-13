import mongoose from 'mongoose'

export const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return
  }
  mongoose.set("strictQuery", false)
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to database')
    })
}
