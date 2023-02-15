import Room from 'models/room'
import catchAsyncError from '@/middlewares/catchAsyncError'
import ApiFeature from '@/utils/apiFeature'

// GET all rooms   =>   /api/rooms
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
})


export { getAllRoom };
