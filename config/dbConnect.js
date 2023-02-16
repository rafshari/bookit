import mongoose from 'mongoose'

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) {
    return
  }

  mongoose
    .set('strictQuery', true)
    .connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useFindAndModify: false,
      //useCreateIndex: true,
    })
    .then(() => {
      console.log('Connected to database')
    })
}

export { dbConnect }
