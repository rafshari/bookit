import Booking from "models/booking";
import User from "models/user";
import Room from "models/room";
import absoluteUrl from "next-absolute-url";
import catchAsyncError from "middlewares/catchAsyncError";
import getrawBody from "raw-body";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Generate stripe checkout session   =>   /api/checkout_session/:roomId
export const stripeCheckOutSession = catchAsyncError(async (req, res) => {

      // Get room details
  const room = await Room.findById(req.query.roomId);

      // Get origin
  const { origin } = absoluteUrl(req);
  const { checkInDate, checkOutDate, daysOfStay } = req.query;

      // Create stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],  
    cancel_url: `${origin}/room/${room._id}`,
    customer_email: req.user.email,
    client_reference_id: req.query.roomId,
    metadata: { checkInDate, checkOutDate, daysOfStay },
    line_items: [
      {
        name: room.name,
        images: [`${room.images[0].url}`],
        amount: req.query.amount * 100,
        currency: "usd",
        quantity: 1,
      },
    ],
  });
  res.status(200).json(session);
});

// Create new booking after payment   =>   /api/webhook
export const webhookCheckout = catchAsyncError(async (req, res) => {
  try {
    const rawBody = await getrawBody(req);
    const signature = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const room = session.client_reference_id;
      const user = (await User.findOne({ email: session.customer_email })).id;

      const amountPaid = session.amount_total / 100;

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };

      const checkInDate = session.metadata.checkInDate;
      const checkOutDate = session.metadata.checkOutDate;
      const daysOfStay = session.metadata.daysOfStay;

      const booking = await Booking.create({
        room,
        user,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now(),
      });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error in stripe checkout payemnt", error);
  }
});
