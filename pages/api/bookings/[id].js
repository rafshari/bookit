import { dbConnect } from 'config/dbConnect';
import nc from 'next-connect';
import onError from 'middlewares/errorMiddleware';
import { getMyBookingDetail } from 'controllers/bookingController';
import { isAuthenticatedUser } from 'middlewares/auth';

dbConnect();

const handler = nc({
    onError,
});

handler.use(isAuthenticatedUser).get(getMyBookingDetail);

export default handler;
