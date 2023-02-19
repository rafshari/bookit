import nc from 'next-connect';
import onError from 'middlewares/errorMiddleware';
import { dbConnect } from 'config/dbConnect';
import { getBookingforCurrentUser } from 'controllers/bookingController';
import { isAuthenticatedUser } from 'middlewares/auth';

dbConnect();

const handler = nc({
    onError,
});

handler.use(isAuthenticatedUser).get(getBookingforCurrentUser);

export default handler;
