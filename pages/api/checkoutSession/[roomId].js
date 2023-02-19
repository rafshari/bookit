import nc from 'next-connect';
import onError from 'middlewares/errorMiddleware';
import { dbConnect } from 'config/dbConnect';
import { stripeCheckOutSession } from 'controllers/paymentController';
import { isAuthenticatedUser } from 'middlewares/auth';

dbConnect();

const handler = nc({
    onError,
});

handler.use(isAuthenticatedUser).get(stripeCheckOutSession);

export default handler;
