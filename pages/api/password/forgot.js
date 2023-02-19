import nc from 'next-connect';
import { dbConnect } from 'config/dbConnect';
import { forgortPassword } from 'controllers/authController';
import onError from 'middlewares/errorMiddleware';

dbConnect();

const handler = nc({
    onError,
});

handler.post(forgortPassword);

export default handler;
