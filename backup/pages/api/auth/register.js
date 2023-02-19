import nc from 'next-connect';
import { registerUser } from 'controllers/authController';
import { dbConnect } from 'config/dbConnect';
import onError from 'middlewares/errorMiddleware';

const handler = nc({
    onError,
});

dbConnect();

handler.post(registerUser);

export default handler;
