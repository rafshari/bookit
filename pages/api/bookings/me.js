import nc from 'next-connect'
import { dbConnect } from 'config/dbConnect'
import onError from 'middlewares/errorMiddleware'
import { getMyBookings } from 'controllers/bookingController'
import { isAuthenticatedUser } from 'middlewares/auth'

dbConnect()

const handler = nc({
  onError,
})

handler.use(isAuthenticatedUser).get(getMyBookings)

export default handler
