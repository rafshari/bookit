import nc from 'next-connect';
import { resetPassword } from 'controllers/authController';
import onError from 'middlewares/errorMiddleware';
import { dbConnect } from 'config/dbConnect';

dbConnect();

const handler = nc({
    onError,
});

handler.post(resetPassword);

export default handler;