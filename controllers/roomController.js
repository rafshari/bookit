import Room from "models/room";
import ErrorHandler from "utils/errorHandler";
import catchAsyncError from "middlewares/catchAsyncError";
import ApiFeature from "utils/apiFeature";
import Booking from "models/booking";

const getAllRoom = catchAsyncError(async (req, res) => {
  const resPerPage = 4;
  const roomCount = await Room.countDocuments();

  const apiFeatures = new ApiFeature(Room.find(), req.query).search().filter();
  let rooms = await apiFeatures.query;
  let filteredRoomCount = rooms.length;
  apiFeatures.pagination(resPerPage);
  rooms = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    count: roomCount,
    filteredRoomCount,
    resPerPage,
    rooms,
  });
});

const getRoom = catchAsyncError(async (req, res, next) => {
  const room = await Room.findById(req.query.id);
  if (!room) {
    return next(new ErrorHandler("Room not found", 404));
  }
  res.status(200).json({ success: true, room });
});

const createRoom = catchAsyncError(async (req, res) => {
  const room = await Room.create(req.body);
  res.status(200).json({ success: true, room });
});

const updateRoom = catchAsyncError(async (req, res, next) => {
  let room = await Room.findById(req.query.id);
  if (!room) {
    return next(new ErrorHandler("Room not found", 404));
  }
  room = await Room.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, room });
});

const deleteRoom = catchAsyncError(async (req, res, next) => {
  let room = await Room.findById(req.query.id);
  if (!room) {
    return next(new ErrorHandler("Room not found", 404));
  }
  await room.remove();
  res.status(200).json({ success: true, message: "Room deleted" });
});
export { getAllRoom, createRoom, getRoom, updateRoom, deleteRoom };

export const createNewReview = catchAsyncError(async (req, res) => {
  const { roomId, rating, comment } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const room = await Room.findById(roomId);

  const isReviewed = room.reviews.find(
    (el) => el.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    room.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    room.reviews.push(review);
    room.numOfReviews = room.reviews.length;
  }
  room.ratings =
    room.reviews.reduce((acc, item) => item.rating + acc, 0) /
    room.reviews.length;

  await room.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

export const checkUserCanReview = catchAsyncError(async (req, res) => {
  const roomId = req.query.roomId;
  const review = await Booking.find({
    user: req.user._id,
    room: roomId,
  });
  let userCanReview = false;
  if (review.length > 0) userCanReview = true;
  res.status(200).json({
    success: true,
    userCanReview,
  });
});
