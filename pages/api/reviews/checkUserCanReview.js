import nc from "next-connect";
import { dbConnect } from "config/dbConnect";
import onError from "middlewares/errorMiddleware";
import { isAuthenticatedUser } from "middlewares/auth";
import { checkUserCanReview } from "controllers/roomController";

dbConnect();

const handler = nc({
  onError,
});

handler.use(isAuthenticatedUser).get(checkUserCanReview);

export default handler;
