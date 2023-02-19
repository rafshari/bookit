import ErrorHandler from 'utils/errorHandler';
import catchAsyncError from 'middlewares/catchAsyncError';
import Booking from 'models/booking';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export const createBooking = catchAsyncError(async (req, res) => {
    const { room, checkInDate, checkOutDate, daysOfStay, amountPaid, paymentInfo } = req.body;
    const booking = await Booking.create({
        user: req.user._id,
        room,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now(),
    });
    res.status(200).json({
        success: true,
        booking,
    });
});

export const checkRoomAvailability = catchAsyncError(async (req, res) => {
    const { room, checkInDate, checkOutDate } = req.query;
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
    });
    let isAvailable;
    if (bookings && bookings.length === 0) {
        isAvailable = true;
    } else {
        isAvailable = false;
    }
    res.status(200).json({
        success: true,
        isAvailable,
    });
});

export const checkBookedDates = catchAsyncError(async (req, res) => {
    const { roomId } = req.query;

    const bookings = await Booking.find({
        room: roomId,
    });

    let bookedDates = [];
    const timeDifference = moment(bookings.checkInDate).utcOffset() / 60;

    bookings.forEach((booking) => {
        const checkInDate = moment(booking.checkInDate).add(timeDifference);
        const checkOutDate = moment(booking.checkOutDate).add(timeDifference);

        const range = moment.range(moment(checkInDate), moment(checkOutDate));
        const dates = Array.from(range.by('day'));
        bookedDates = bookedDates.concat(dates);
    });

    res.status(200).json({
        success: true,
        bookedDates,
    });
});

export const getBookingforCurrentUser = catchAsyncError(async (req, res) => {
    const bookings = await Booking.find({
        user: req.user._id,
    }).populate({
            path: 'room',
            select: 'name pricePerNight images',
        })
        .populate({
            path: 'user',
            select: 'name email',
        });
    res.status(200).json({
        success: true,
        bookings,
    });
});

export const getBookingDetail = catchAsyncError(async (req, res) => {
    const booking = await Booking.findById(req.query.id)
        .populate({
            path: 'room',
            select: 'name pricePerNight images',
        })
        .populate({
            path: 'user',
            select: 'name email',
        });

    res.status(200).json({
        success: true,
        booking,
    });
});
