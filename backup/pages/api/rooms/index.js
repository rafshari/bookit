import nc from 'next-connect'
import {getAllRoom} from '@/controllers/roomController'
import { dbConnect } from '@/config/dbConnect'
import onError from '@/middlewares/errorMiddleware'

const handler = nc({ onError })

dbConnect();

handler.get(getAllRoom)

export default handler
