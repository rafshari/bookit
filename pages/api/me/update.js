import nc from 'next-connect';
import { dbConnect } from 'config/dbConnect';
import onError from 'middlewares/errorMiddleware';
import { updateProfile } from 'controllers/authController';
import { isAuthenticatedUser } from 'middlewares/auth';
dbConnect();

const handler = nc({
    onError,
});

handler.use(isAuthenticatedUser).put(updateProfile);

export default handler;
