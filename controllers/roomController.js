import Room from 'models/room'
import ErrorHandler from 'utils/errorHandler'
import catchAsyncError from 'middlewares/catchAsyncError'
import ApiFeature from 'utils/apiFeature'
import Booking from 'models/booking'
import cloudinary from 'cloudinary'

// ..... all rooms   =>   /api/rooms
const getAllRoom = catchAsyncError(async (req, res) => {
  const resPerPage = 4
  const roomCount = await Room.countDocuments()
  const apiFeatures = new ApiFeature(Room.find(), req.query).search().filter()
  let rooms = await apiFeatures.query
  let filteredRoomCount = rooms.length
  apiFeatures.pagination(resPerPage)

  rooms = await apiFeatures.query.clone()

  res.status(200).json({
    success: true,
    count: roomCount,
    filteredRoomCount,
    resPerPage,
    rooms,
  })
})

// Get room details   =>   /api/rooms/:id
const getRoom = catchAsyncError(async (req, res, next) => {
  const room = await Room.findById(req.query.id)
  if (!room) {
    return next(new ErrorHandler('Room not found', 404))
  }
  res.status(200).json({ success: true, room })
})


// Create new room   =>   /api/rooms
const createRoom = catchAsyncError(async (req, res) => {
  //console.log('requset:',req.body)
  const images = req.body.images
  let imagesLinks = []
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: 'bookit/rooms',
    })
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    })
  }
  req.body.images = imagesLinks
  req.body.user = req.user._id

  const room = await Room.create(req.body)
  res.status(200).json({ success: true, room })
  //console.log('سوم:', room, success)
})
 

// Update room details   =>   /api/rooms/:id
const updateRoom = catchAsyncError(async (req, res, next) => {
  let room = await Room.findById(req.query.id)
  if (!room) {
    return next(new ErrorHandler('Room not found', 404))
  }

  if (req.body.images) {
    // Delete images associated with the room
    for (let i = 0; i < room.images.length; i++) {
        await cloudinary.v2.uploader.destroy(room.images[i].public_id)
    }
    let imagesLinks = []
    const images = req.body.images;

    for (let i = 0; i < images.length; i++) {

        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'bookit/rooms',
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })

    }

    req.body.images = imagesLinks;
}
  room = await Room.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(200).json({ success: true, room })
})


// Delete room   =>   /api/rooms/:id
const deleteRoom = catchAsyncError(async (req, res, next) => {
  let room = await Room.findById(req.query.id)
  if (!room) {
    return next(new ErrorHandler('Room not found', 404))
  }
   // Delete images associated with the room
   for (let i = 0; i < room.images.length; i++) {
    await cloudinary.v2.uploader.destroy(room.images[i].public_id)
}

  await room.remove()
  res.status(200).json({ success: true, message: 'Room deleted' })
})


// Create a new review   =>   /api/reviews
const createNewReview = catchAsyncError(async (req, res) => {
  const { roomId, rating, comment } = req.body

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  }

  const room = await Room.findById(roomId)

  const isReviewed = room.reviews.find(
    (el) => el.user.toString() === req.user._id.toString()
  )
  if (isReviewed) {
    room.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment
        review.rating = rating
      }
    })
  } else {
    room.reviews.push(review)
    room.numOfReviews = room.reviews.length
  }
  room.ratings =
    room.reviews.reduce((acc, item) => item.rating + acc, 0) /
    room.reviews.length

  await room.save({ validateBeforeSave: false })

  res.status(200).json({
    success: true,
  })
})

// Check Review Availability   =>   /api/reviews/check_review_availability
const checkUserCanReview = catchAsyncError(async (req, res) => {
  const roomId = req.query.roomId
  const review = await Booking.find({
    user: req.user._id,
    room: roomId,
  })
  let userCanReview = false
  if (review.length > 0) userCanReview = true
  res.status(200).json({
    success: true,
    userCanReview,
  })
})

// Get all rooms - ADMIN   =>   /api/admin/rooms
const getAllRoomsAdmin = catchAsyncError(async (req, res) => {
  const rooms = await Room.find()

  res.status(200).json({
    success: true,
    rooms,
  })
})

// Get all room reviews - ADMIN   =>   /api/reviews
const getRoomReviews = catchAsyncError(async (req, res) => {

  const room = await Room.findById(req.query.id);

  res.status(200).json({
      success: true,
      reviews: room.reviews
  })

})


// Delete room review - ADMIN   =>   /api/reviews
const deleteReview = catchAsyncError(async (req, res) => {

  const room = await Room.findById(req.query.roomId);

  const reviews = room.reviews.filter(review => review._id.toString() !== req.query.id.toString())

  const numOfReviews = reviews.length;
  
  const ratings = room.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

  await Room.findByIdAndUpdate(req.query.roomId, {
      reviews,
      ratings,
      numOfReviews
  }, {
      new: true,
      runValidators: true,
      useFindAndModify: false
  })

  res.status(200).json({
      success: true
  })

})
export {
  getAllRoom,
  createRoom,
  getRoom,
  updateRoom,
  deleteRoom,
  createNewReview,
  checkUserCanReview,
  getAllRoomsAdmin,
  getRoomReviews,
  deleteReview
}
