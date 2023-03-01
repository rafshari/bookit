import User from 'models/user';
import bcrypt from 'bcryptjs';
import ErrorHandler from 'utils/errorHandler';
import catchAsyncError from 'middlewares/catchAsyncError';
import cloudinary from 'cloudinary';
import absoluteUrl from 'next-absolute-url';
import sendEmail from 'utils/sendEmail';
import crypto from 'crypto';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_APISECRET,
});
// REGISTER USER
export const registerUser = catchAsyncError(async (req, res) => {
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'bookit/avatars',
        width: '150',
        crop: 'scale',
    });

    const { email, password, name } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.url,
        },
    });
    res.status(200).json({ success: true, message: 'User registered successfully' });
});
// GET CURRENT USER   => /api/me
export const currentUser = catchAsyncError(async (req, res) => {
    const user = await User.findById(req.user._id);
    res.status(200).json({
        success: true,
        user,
    });
});
// GET user details by ADMIN  =>   /api/admin/users/:id
export const getUserDetails = catchAsyncError(async (req, res) => {

    const user = await User.findById(req.query.id);

    if (!user) {
        return next(new ErrorHandler('User not found with this ID.', 400))
    }

    res.status(200).json({
        success: true,
        user
    })

})

// Update user profile   =>   /api/me/update
export const updateProfile = catchAsyncError(async (req, res) => {

    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name;
        user.email = req.body.email;

        if (req.body.password) user.password = req.body.password;
    }

    // Update avatar
    if (req.body.avatar !== '') {

        const image_id = user.avatar.public_id;

        // Delete user previous image/avatar
        await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'bookit/avatars',
            width: '150',
            crop: 'scale'
        })

        user.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }

    }

    await user.save();

    res.status(200).json({
        success: true
    })

})

// UPDATE USER by ADMIN  =>   /api/admin/users/:id
export const updateUser = catchAsyncError(async (req, res) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }

    const user = await User.findByIdAndUpdate(req.query.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true
    })

})
// FORGOT PASSWORD
export const forgortPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({
        email: req.body.email,
    });

    if (!user) {
        return next(new ErrorHandler('user not found'));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({
        validateBeforeSave: false,
    });

    const resetUrl = `${absoluteUrl(req).origin}/password/reset/${resetToken}`;
    const message = `Your password reset url is as follow: \n \n ${resetUrl} \n \n If you haven't requested please ignore`;
    try {
        await sendEmail({
            email: user.email,
            subject: 'BookIt password recovery',
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({
            validateBeforeSave: false,
        });
        return next(new ErrorHandler(error.message, 500));
    }
});
// RESET PASSWORD
export const resetPassword = catchAsyncError(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.query.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {
            $gt: Date.now(),
        },
    });
    if (!user) {
        return next(new ErrorHandler('Password reset token is incorrect or expires', 400));
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password doesnt match', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        message: 'Password updated',
    });
});


//GET ALL USERS   =>   /api/admin/users
export const allAdminUsers = catchAsyncError(async (req, res) => {

    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })

})


// Delete user    =>   /api/admin/users/:id
export const deleteUser = catchAsyncError(async (req, res) => {

    const user = await User.findById(req.query.id);

    if (!user) {
        return next(new ErrorHandler('User not found with this ID.', 400))
    }

    // Remove avatar 
    const image_id = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(image_id)


    await user.remove();

    res.status(200).json({
        success: true,
    })

})


