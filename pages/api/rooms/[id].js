import nc from 'next-connect'
import { dbConnect } from 'config/dbConnect'
import { deleteRoom, getRoom, updateRoom } from 'controllers/roomController'
import onError from 'middlewares/errorMiddleware'
import { authorizeRoles, isAuthenticatedUser } from '@/middlewares/auth'

const handler = nc({
  onError,
})

dbConnect()

handler.get(getRoom)

handler.use(isAuthenticatedUser, authorizeRoles('admin')).put(updateRoom)

handler.use(isAuthenticatedUser, authorizeRoles('admin')).delete(deleteRoom)

export default handler  
