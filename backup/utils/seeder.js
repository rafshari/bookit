const Room = require('../models/room')
const rooms = require('../data/rooms')
const mongoose = require('mongoose')

mongoose
  .connect('mongodb://127.0.0.1:27017/bookittest', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
    //useCreateIndex: true,
  })

const seedRooms = async () => {
  try {
    await Room.deleteMany()
    console.log('Rooms are deleted.')
    await Room.insertMany(rooms)
    console.log('rooms are added.')
    
  } catch (error) {
    console.log(error.message)
    process.exit()
  }
}

seedRooms()
