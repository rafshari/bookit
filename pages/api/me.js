import nc from 'next-connect';
import { dbConnect } from 'config/dbConnect';

import { currentUser } from 'controllers/authController';

import onError from 'middlewares/errorMiddleware';
import { isAuthenticatedUser } from 'middlewares/auth';

dbConnect();

const handler = nc({
    onError,
});

handler.use(isAuthenticatedUser).get(currentUser);

export default handler;
