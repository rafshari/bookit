import nc from 'next-connect'
import { getAllRoomsAdmin, createRoom } from 'controllers/roomController'
import { dbConnect } from 'config/dbConnect'
import onError from 'middlewares/errorMiddleware'
import { isAuthenticatedUser, authorizeRoles } from '@/middlewares/auth'

const handler = nc({
  onError,
})

dbConnect()

handler
  .use(isAuthenticatedUser, authorizeRoles('admin'))
  .get(getAllRoomsAdmin)

export default handler
