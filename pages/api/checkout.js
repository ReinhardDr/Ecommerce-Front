import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Setting } from "@/models/Setting";
const stripe = require("stripe")(process.env.STRIPE_SK);
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
    return;
  }

  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts,
  } = req.body;

  await mongooseConnect();
  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];
  let totalPrice = 0;

  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find((p) => p._id.toString() === productId);
    const quantity = productsIds.filter((id) => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      const productTotalPrice = productInfo.price * quantity;
      line_items.push({
        quantity,
        price_data: {
          currency: "VND",
          product_data: { name: productInfo.title },
          unit_amount: productInfo.price,
        },
      });
      totalPrice += productTotalPrice;
    }
  }

  const session = await getServerSession(req, res, authOptions);

  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
    userEmail: session?.user?.email,
  });

  const shippingFeeSetting = await Setting.findOne({ name: "shippingFee" });
  const shippingFeeCents = parseInt(shippingFeeSetting.value || "1");

  const stripeSession = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
    metadata: { orderId: orderDoc._id.toString() },
    allow_promotion_codes: true,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Phí Vận Chuyển",
          type: "fixed_amount",
          fixed_amount: { amount: shippingFeeCents, currency: "VND" },
        },
      },
    ],
    locale: "vi", // Thêm thuộc tính này để chuyển trang Stripe Checkout sang tiếng Việt
  });

  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const productDetails = line_items
    .map(
      (item) => `${item.price_data.product_data.name} x${item.quantity}`
    )
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
    console.log(`Confirmation email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }

  res.json({ url: stripeSession.url });
}
