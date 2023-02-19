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

export const currentUser = catchAsyncError(async (req, res) => {
    const user = await User.findById(req.user._id);
    res.status(200).json({
        success: true,
        user,
    });
});

export const updateUser = catchAsyncError(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name;
        user.email = req.body.email;

        if (req.body.password) user.password = req.body.password;
    }
    if (req.body.avatar !== '') {
        const image_id = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(image_id);
        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'bookit/avatars',
            width: '150',
            crop: 'scale',
        });
        user.avatar = {
            public_id: result.public_id,
            url: result.url,
        };
    }
    await user.save();
    res.status(200).json({
        success: true,
    });
});

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
