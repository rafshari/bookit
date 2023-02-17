import User from 'models/user';
import ErrorHandler from 'utils/errorHandler';
import catchAsyncError from 'middlewares/catchAsyncError';


// register user => api/auth/register
export const registerUser = catchAsyncError(async (req, res) => {
    const { name, email, password  } = req.body;

    const user = await User.create({
        name,
        email,
        password,
       
    });
    res.status(200).json({ success: true, message: 'User registered successfully' });
});

