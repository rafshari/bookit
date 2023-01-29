const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'درج عنوان الزامی است !'],
    trim: true,
    maxLength: [100, 'نباید تعداد حروف از 100 حرف بیشتر باشد'],
  },
  pricePerNight: {
    type: Number,
    required: [true, 'درج قیمت الزامی است !'],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, 'درج توضیحات الزامی است !'],
  },
  address: {
    type: String,
    required: [true, 'درج آدرس الزامی است !'],
    maxLength: [500, 'نباید تعداد حروف از 500 حرف بیشتر باشد'],
  },
  guestCapacity: {
    type: Number,
    required: [true, 'درج حداکثر تعداد مهمان قابل پذیرش الزامی است !'],
  },
  numOfBeds: {
    type: Number,
    required: [true, 'درج  تعداد تخت موجود الزامی است !'],
  },
  internet: {
    type: Boolean,
    default: false,
  },
  breakfast: {
    type: Boolean,
    default: false,
  },
  airConditioned: {
    type: Boolean,
    default: false,
  },
  petAllowed: {
    type: Boolean,
    default: false,
  },
  rooCleaning: {
    type: Boolean,
    default: false,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, 'لطفا دسته بندی را وارد کنید'],
    enum: {
      values: ['King', 'Single', 'Twins'],
      message: 'لطفا یک دسته بندی درست انتخاب فرمایید',
    },
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model.Rooms || mongoose.model('Room', roomSchema)
