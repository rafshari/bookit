import nc from "next-connect";
import { getAllRoom, createRoom } from "controllers/roomController";
import { dbConnect } from "config/dbConnect";
import onError from "middlewares/errorMiddleware";
import { isAuthenticatedUser, authorizeRoles } from 'middlewares/auth'


const handler = nc({
  onError,
});

dbConnect();

handler.get(getAllRoom);

handler
.use(isAuthenticatedUser, authorizeRoles('admin'))
.post(createRoom);

export default handler;
