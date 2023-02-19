import nc from 'next-connect';
import { dbConnect } from 'config/dbConnect';
import { createBooking } from 'controllers/bookingController';
import onError from 'middlewares/errorMiddleware';
import { isAuthenticatedUser } from 'middlewares/auth';

dbConnect();

const handler = nc({
    onError,
});

handler.use(isAuthenticatedUser).post(createBooking);

export default handler;
