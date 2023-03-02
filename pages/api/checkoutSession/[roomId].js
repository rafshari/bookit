import nc from 'next-connect';
import onError from 'middlewares/errorMiddleware';
import { dbConnect } from 'config/dbConnect';
import { stripeCheckOutSession } from 'controllers/paymentController';
import { isAuthenticatedUser } from 'middlewares/auth';


const handler = nc({
    onError,
});

dbConnect();
handler.use(isAuthenticatedUser).get(stripeCheckOutSession);

export default handler;