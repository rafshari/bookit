import Room from '../models/room'

//Get all Rooms => /api/rooms
const allRooms = async (req, res) => {
  try {
    const rooms = await Room.find()

    res.status(200).json({
      success: true,
      count: rooms.length,
      rooms,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    })
  }
}
// create new room => /api/rooms

const newRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body)
    res.status(200).json({
      success: true,
      room,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    })
  }
}
// Get room details => /api/rooms/:id

const getSingleRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.query.id)
    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'اتاق با این شناسه یافت نشد ',
      })
    }
    res.status(200).json({
      success: true,
      room,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    })
  }
}
// Update selected room  => /api/rooms/:id

const updateRoom = async (req, res) => {
  try {
    let room = await Room.findById(req.query.id)
    if (!room) {
      return res.status(404).json({
        success: false,
        error: 'اتاق با این شناسه یافت نشد ',
      })
    }
    room = await Room.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    })
    res.status(200).json({
        success: true,
        room,
      })

  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    })
  }
}
export { allRooms, newRoom, getSingleRoom, updateRoom }
