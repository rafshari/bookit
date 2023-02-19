import ErrorHandler from 'utils/errorHandler';
import catchAsyncError from './catchAsyncError';
import { getSession } from 'next-auth/react';

export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const session = await getSession({ req });
    if (!session) {
        return next(new ErrorHandler('Login first to access this resource'));
    }
    req.user = session.user;
    next();
});
