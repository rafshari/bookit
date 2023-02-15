import nc from 'next-connect'
import {
  getSingleRoom,
  updateRoom,
  deleteRoom,
} from '@/controllers/roomController'
import dbConnect from '@/config/dbConnect'
import onError from '@/middlewares/errorMiddleware'

const handler = nc({ onError })

dbConnect()
handler.get(getSingleRoom)
handler.put(updateRoom)
handler.delete(deleteRoom)

export default handler
