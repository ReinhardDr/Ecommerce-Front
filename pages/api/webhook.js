const nodemailer = require('nodemailer');
const stripe = require('stripe')(process.env.STRIPE_SK);
import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { buffer } from "micro";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

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
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log("Checkout session completed:", session);

      const orderId = session.metadata.orderId;
      if (!orderId) {
        console.error("Missing orderId in session metadata.");
        return res.status(400).send("Missing orderId in session metadata.");
      }

      try {
        const order = await Order.findByIdAndUpdate(orderId, { paid: true });
        if (!order) {
          console.error(`Order not found for ID: ${orderId}`);
          return res.status(404).send("Order not found.");
        }

        // Get line items and calculate total
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        const productDetails = lineItems.data
          .map((item) => `${item.description} x${item.quantity} - ${(item.amount_total).toLocaleString("vi-VN")} VND`)
          .join("\n"); // Changed to new line for better email formatting

        const totalPrice = lineItems.data.reduce((sum, item) => sum + item.amount_total, 0);

        // Get payment intent first, then get charge
        const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
        const charge = paymentIntent.latest_charge ? 
          await stripe.charges.retrieve(paymentIntent.latest_charge) : null;
        
        const receiptUrl = charge?.receipt_url;
        console.log("Receipt URL found:", receiptUrl); // Debug log

        if (receiptUrl) {
          const emailData = session.customer_details?.email || order.email;
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL_USERNAME,
              pass: process.env.EMAIL_PASSWORD,
            },
          });

          const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: emailData,
            subject: "Xác Nhận Đã Thanh Toán Đơn Hàng",
            html: `
              <h2>Xác Nhận Đã Thanh Toán Đơn Hàng</h2>
              <p><strong>Đơn hàng ID:</strong> ${order._id}</p>
              <p><strong>Chi tiết đơn hàng:</strong></p>
              <pre>${productDetails}</pre>
              <p><strong>Tổng giá trị đơn hàng:</strong> ${totalPrice.toLocaleString("vi-VN")} VND</p>
              <p><strong>Biên lai thanh toán:</strong> <a href="${receiptUrl}">Nhấn vào đây để xem biên lai</a></p>
              <br>
              <p>Cảm ơn vì đã dùng dịch vụ của chúng tôi.</p>
              <p>Trân Trọng,<br>Mạnh</p>
            `,
          };

          await transporter.sendMail(mailOptions);
          console.log("Email sent successfully with receipt URL:", receiptUrl);
        } else {
          console.log("No receipt URL available:", {
            paymentIntent: session.payment_intent,
            charge: paymentIntent.latest_charge
          });
        }
      } catch (error) {
        console.error("Error processing checkout.session.completed event:", error);
        return res.status(500).send("Internal Server Error.");
      }
      break;
    }

    case "charge.updated": {
      const charge = event.data.object;
      console.log("Charge updated:", charge);

      const orderId = charge.metadata?.orderId;
      if (orderId) {
        try {
          const order = await Order.findById(orderId);
          if (!order) {
            console.error(`Order not found for ID: ${orderId}`);
            return res.status(404).send("Order not found.");
          }

          // Cập nhật trạng thái đơn hàng
          await Order.findByIdAndUpdate(orderId, { status: "charge_updated" });
          console.log(`Order ${orderId} updated successfully for charge update.`);

          // Kiểm tra receipt_url trong charge và gửi email nếu có
          const receiptUrl = charge.receipt_url || null;

          if (receiptUrl) {
            const emailData = order.email;
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
              },
            });

            const mailOptions = {
              from: process.env.EMAIL_USERNAME,
              to: emailData,
              subject: "Cập Nhật Thanh Toán",
              text: `Đơn hàng ID: ${order._id} đã được cập nhật trạng thái thanh toán.
              Bạn có thể xem biên lai thanh toán tại đây: ${receiptUrl}

              Cảm ơn vì đã dùng dịch vụ của chúng tôi.
              Trân Trọng,
              Mạnh`,
            };

            await transporter.sendMail(mailOptions);
            console.log("Email gửi thành công charge.updated.");
          } else {
            console.log("không biên lai, email không gửi.");
          }
        } catch (error) {
          console.error("Error processing charge.updated event:", error);
        }
      }
      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send("ok");
}

export const config = {
  api: { bodyParser: false },
};


// Hàm lấy receipt URL từ charge trực tiếp
async function getReceiptUrl(chargeId) {
  try {
    const charge = await stripe.charges.retrieve(chargeId);
    return charge.receipt_url || null;
  } catch (error) {
    console.error("Error fetching receipt URL from charge:", error);
    return null;
  }
}
