import nc from 'next-connect'
import {dbConnect} from 'config/dbConnect'

import {allAdminUsers}  from 'controllers/authController'

import onError from 'middlewares/errorMiddleware'
import { isAuthenticatedUser, authorizeRoles } from 'middlewares/auth'

const handler = nc({ onError });

dbConnect();

handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .get(allAdminUsers)

export default handler;