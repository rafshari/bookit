import nc from 'next-connect';
import onError from 'middlewares/errorMiddleware';
import { dbConnect } from 'config/dbConnect';
import { checkBookedDates } from 'controllers/bookingController';

dbConnect();

const handler = nc({
    onError,
});

handler.get(checkBookedDates);

export default handler;
