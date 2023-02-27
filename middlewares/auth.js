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


// Handling user roles
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource.`, 403))
        }

        next()
    }
}
