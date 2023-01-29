import nc from 'next-connect'
import { getSingleRoom, updateRoom } from '@/controllers/roomControllers'
import dbConnect from '@/config/dbConnect'

const handler = nc()

dbConnect()

handler.get(getSingleRoom)
handler.put(updateRoom)

export default handler
