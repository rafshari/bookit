import ErrorHandler from 'utils/errorHandler'
import catchAsyncError from 'middlewares/catchAsyncError'
import Booking from 'models/booking'
import Moment from 'moment'
import { extendMoment } from 'moment-range'

const moment = extendMoment(Moment)

// Create new Booking   =>   /api/bookings
export const createBooking = catchAsyncError(async (req, res) => {
  const {
    room,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  } = req.body
  const booking = await Booking.create({
    room,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt: Date.now(),
  })
  res.status(200).json({
    success: true,
    booking,
  })
})
// Create new booking   =>   /api/bookings/check
export const checkRoomAvailability = catchAsyncError(async (req, res) => {
  const { room, checkInDate, checkOutDate } = req.query
  const bookings = await Booking.find({
    room,
    $and: [
      {
        checkInDate: {
          $lte: checkOutDate,
        },
      },
      {
        checkOutDate: {
          $gte: checkInDate,
        },
      },
    ],
  })
  // Check if there is any booking available
  let isAvailable
  if (bookings && bookings.length === 0) {
    isAvailable = true
  } else {
    isAvailable = false
  }
  res.status(200).json({
    success: true,
    isAvailable,
  })
})

// Check booked dates of a room  => /api/bookings/check_booked_dates
export const checkBookedDates = catchAsyncError(async (req, res) => {
  const { roomId } = req.query

  const bookings = await Booking.find({
    room: roomId,
  })

  let bookedDates = []
  const timeDifference = moment(bookings.checkInDate).utcOffset() / 60

  bookings.forEach((booking) => {
    const checkInDate = moment(booking.checkInDate).add(timeDifference)
    const checkOutDate = moment(booking.checkOutDate).add(timeDifference)

    const range = moment.range(moment(checkInDate), moment(checkOutDate))
    const dates = Array.from(range.by('day'))
    bookedDates = bookedDates.concat(dates)
  })

  res.status(200).json({
    success: true,
    bookedDates,
  })
})

// Get My bookings List   =>   /api/bookings/me
export const getMyBookings = catchAsyncError(async (req, res) => {
 // console.log('ttt',req.user._id)
  console.log('fff',req.user)

  const bookings = await Booking.find({user: req.user._id
 
     }).populate({
      path: 'room',
      select: 'name pricePerNight images',
    })
    .populate({      
      path: 'user',
      select: 'name email',
    })

  res.status(200).json({
    success: true,
    bookings,
    
  })
  console.log('ggg',bookings)
})
// Get all bookings - ADMIN   =>   /api/admin/bookings
export const allAdminBookings = catchAsyncError(async (req, res) => {
  const bookings = await Booking.find()
    .populate({
      path: 'room',
      select: 'name pricePerNight images',
    })
    .populate({
      path: 'user',
      select: 'name email',
    })
    if (!bookings) {
      return next(new ErrorHandler('Bookings not found', 400))
    }
  res.status(200).json({
    success: true,
    bookings,
  })
})
// Get My booking details   =>   /api/bookings/:id
export const getMyBookingDetail = catchAsyncError(async (req, res) => {
  const booking = await Booking.findById(req.query.id)
    .populate({
      path: 'room',
      select: 'name pricePerNight images',
    })
    .populate({
      path: 'user',
      select: 'name email phoneNumber',
    })

  res.status(200).json({
    success: true,
    booking,
  })
})

// Get booking details Admin   =>   /api/admin/bookings/:id
export const getBookingDetails = catchAsyncError(async (req, res) => {
  const booking = await Booking.findById(req.query.id)
    .populate({
      path: 'room',
      select: 'name pricePerNight images',
    })
    .populate({
      path: 'user',
      select: 'name email',
    })

  res.status(200).json({
    success: true,
    booking,
  })
})


// Delete booking - ADMIN   =>   /api/admin/bookings/id
export const deleteBooking = catchAsyncError(async (req, res, next) => {
  const booking = await Booking.findById(req.query.id)

  if (!booking) {
    return next(new ErrorHandler('Booking not found with this ID', 400))
  }

  await booking.remove()

  res.status(200).json({
    success: true,
  })
})
