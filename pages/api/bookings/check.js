import { dbConnect } from 'config/dbConnect';
import nc from 'next-connect';
import onError from 'middlewares/errorMiddleware';
import { checkRoomAvailability } from 'controllers/bookingController';
import { isAuthenticatedUser } from 'middlewares/auth';

dbConnect();

const handler = nc({
    onError,
});

handler.get(checkRoomAvailability);

export default handler;
