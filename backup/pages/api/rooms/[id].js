import nc from "next-connect";
import { dbConnect } from "config/dbConnect";
import { deleteRoom, getRoom, updateRoom } from "controllers/roomController";
import onError from "middlewares/errorMiddleware";

const handler = nc({
  onError,
});

dbConnect();

handler.get(getRoom);

handler.put(updateRoom);

handler.delete(deleteRoom);

export default handler;
