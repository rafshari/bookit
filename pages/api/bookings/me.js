import nc from 'next-connect';
import onError from 'middlewares/errorMiddleware';
import { dbConnect } from 'config/dbConnect';
import { getMyBookings } from 'controllers/bookingController';
import { isAuthenticatedUser } from 'middlewares/auth';

dbConnect();

const handler = nc({
    onError,
});

handler.use(isAuthenticatedUser).get(getMyBookings);

export default handler;
