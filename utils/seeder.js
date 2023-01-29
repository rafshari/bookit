const Room = require('../models/room')
const rooms = require('../data/rooms.json')
const mongoose = require('mongoose')

mongoose
  .connect('mongodb://127.0.0.1:27017/bookit', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
    //useCreateIndex: true,
  })
  .then((con) => console.log('Connected to the local database'))

const seedRooms = async () => {
  try {
    await Room.deleteMany()
    console.log('Rooms are deleted.')
    await Room.insertMany(rooms)
    console.log('rooms are added.')
1

  } catch (error) {
    console.log(error.message)
    process.exit()
  }
}

seedRooms()
