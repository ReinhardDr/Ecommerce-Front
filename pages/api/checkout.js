import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Setting } from "@/models/Setting";
const stripe = require("stripe")(process.env.STRIPE_SK);
import nodemailer from "nodemailer";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
    return;
  }

  try {
    const {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    } = req.body;

    // Connect to MongoDB
    await mongooseConnect();

    // Process products
    const uniqueIds = [...new Set(cartProducts)];
    const productsInfos = await Product.find({ _id: uniqueIds });

    let line_items = [];
    let totalPrice = 0;
    let productsList = [];

    for (const productId of uniqueIds) {
      const productInfo = productsInfos.find((p) => p._id.toString() === productId);
      const quantity = cartProducts.filter((id) => id === productId)?.length || 0;
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
        productsList.push(`${productInfo.title} (${quantity} cái) - ${formatCurrency(productTotalPrice)}`);
      }
    }

    // Get session and create order in parallel
    const [session, shippingFeeSetting] = await Promise.all([
      getServerSession(req, res, authOptions),
      Setting.findOne({ name: "shippingFee" })
    ]);

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

    const shippingFeeCents = parseInt(shippingFeeSetting?.value || "1");

    // Create Stripe session
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
      locale: "vi",
    });

    // Update order with receipt URL and send email in the background
    const fullAddress = `${streetAddress}, ${city}, ${postalCode}, ${country}`;
    
    Promise.all([
      Order.findByIdAndUpdate(orderDoc._id, { receipt_url: stripeSession.url }),
      transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "Xác Nhận Đơn Hàng",
        text: `THÔNG TIN ĐƠN HÀNG CỦA BẠN

Mã Đơn Hàng: ${orderDoc._id}
Khách Hàng: ${name}
Địa Chỉ Giao Hàng: ${fullAddress}

CHI TIẾT ĐƠN HÀNG:
${productsList.join('\n')}

Phí Vận Chuyển: ${formatCurrency(shippingFeeCents)}
Tổng Cộng: ${formatCurrency(totalPrice + shippingFeeCents)}

Link Thanh Toán: ${stripeSession.url}

Vui lòng nhấn vào link trên để tiến hành thanh toán đơn hàng của bạn.

Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi.

Trân trọng,
Mạnh`
      })
    ]).catch(error => {
      // Log error but don't stop the checkout process
      console.error("Lỗi Nền:", error);
    });

    // Return Stripe session URL immediately
    res.json({ url: stripeSession.url });

  } catch (error) {
    console.error("Checkout lỗi:", error);
    res.status(500).json({ error: "Server ko nhận đc data" });
  }
}

export const config = {
  api: { bodyParser: true },
};