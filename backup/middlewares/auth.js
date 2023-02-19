import ErrorHandler from 'utils/errorHandler';
import catchAsyncError from './catchAsyncError';
import { getServerSession } from "next-auth/next"


export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const session = await getServerSession({ req });
    if (!session) {
        return next(new ErrorHandler('Login first to access this resource'));
    }
    next();
});
