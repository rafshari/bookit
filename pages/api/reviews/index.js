import nc from "next-connect";
import { dbConnect } from "config/dbConnect";
import onError from "middlewares/errorMiddleware";
import { createNewReview , getRoomReviews} from "controllers/roomController";
import { isAuthenticatedUser } from "middlewares/auth";

const handler = nc({
  onError,
});

dbConnect();

handler
.use(isAuthenticatedUser)
.post(createNewReview);

handler
.use(isAuthenticatedUser)
.get(getRoomReviews);


export default handler;
