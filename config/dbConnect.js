import mongoose from 'mongoose'

const dbConnect = () => {
  if (mongoose.connection.readyState === 1) {
    return
  }

  mongoose.set('strictQuery', false)
  mongoose
    .connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useFindAndModify: false,
      //useCreateIndex: true,
    })
    
}

export default dbConnect
