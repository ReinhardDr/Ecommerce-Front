import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
import nodemailer from "nodemailer";
const stripe = require("stripe")(process.env.STRIPE_SK);
import { buffer } from "micro";

const endpointSecret = "whsec_634d3142fd2755bd61adaef74ce0504bd2044848c8aac301ffdb56339a0ca78d";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("Should be a POST request");
    return;
  }

  await mongooseConnect();
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === "paid";

      if (orderId && paid) {
        // Update the order as paid in your database
        const order = await Order.findByIdAndUpdate(orderId, { paid: true });

        // Send confirmation email to the customer
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USERNAME, // Your email address
            pass: process.env.EMAIL_PASSWORD, // App Password
          },
        });

        // Format the product details for the email
        const productDetails = order.line_items
          .map((item) => `${item.price_data.product_data.name} x${item.quantity}`)
          .join(", ");

          const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: "Xác Nhận Thanh Toán Đơn Hàng",
            text: ` Đây Là Đơn Xác Nhận Thanh Toán.
                  Đơn hàng ID là: ${orderDoc._id}.
                  Bạn đặt đơn hàng thanh toán sản phẩm: ${productDetails}.
                  Giá trị đơn hàng này là: ${formatCurrency(totalPrice)}.
        
        
                  Cảm ơn vì đã dùng dịch vụ của chúng tôi.
                  Trân Trọng,
                  Mạnh`,
          };


        try {
          await transporter.sendMail(mailOptions);
          console.log(`Email receipt sent to ${order.email}`);
        } catch (error) {
          console.error("Error sending email:", error);
        }
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send("ok");
}

export const config = {
  api: { bodyParser: false },
};
