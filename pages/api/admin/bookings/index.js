import nc from 'next-connect'
import {dbConnect} from 'config/dbConnect'

import { allAdminBookings } from 'controllers/bookingController'

import onError from 'middlewares/errorMiddleware'
import { isAuthenticatedUser, authorizeRoles } from 'middlewares/auth'

const handler = nc({ onError })

dbConnect()

handler
.use(isAuthenticatedUser, authorizeRoles('admin'))
.get(allAdminBookings)

export default handler
