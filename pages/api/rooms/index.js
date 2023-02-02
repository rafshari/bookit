import nc from 'next-connect'
import { allRooms, newRoom } from '@/controllers/roomControllers'
import dbConnect from '@/config/dbConnect'
import onError from '@/middlewares/errors'

const handler = nc({ onError })

dbConnect()

handler.get(allRooms)
handler.post(newRoom)

export default handler
