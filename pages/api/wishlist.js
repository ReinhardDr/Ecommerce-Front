import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { WishedProduct } from "@/models/WishedProduct";

export default async function handle(req, res) {
  try {
    await mongooseConnect();

    // Lấy session từ người dùng (nếu có)
    const session = await getServerSession(req, res, authOptions);
    const userEmail = session?.user?.email; // Email từ session nếu đã đăng nhập

    if (req.method === "POST") {
      const { product } = req.body;

      if (!product) {
        return res.status(400).json({ error: "Product is required" });
      }

      if (userEmail) {
        // Người dùng đã đăng nhập, lưu wishlist vào cơ sở dữ liệu
        const wishedDoc = await WishedProduct.findOne({ userEmail, product });

        if (wishedDoc) {
          // Nếu sản phẩm đã có trong wishlist, xóa nó
          await WishedProduct.findByIdAndDelete(wishedDoc._id);
          return res.json({ message: "Product removed from wishlist (logged in)", wishedDoc });
        } else {
          // Nếu sản phẩm chưa có, thêm vào
          const newWishedProduct = await WishedProduct.create({ userEmail, product });
          return res.json({ message: "Product added to wishlist (logged in)", newWishedProduct });
        }
      } else {
        // Người dùng chưa đăng nhập, wishlist chỉ hoạt động tạm thời
        const tempWishlist = req.cookies.tempWishlist
          ? JSON.parse(req.cookies.tempWishlist)
          : [];

        if (tempWishlist.includes(product)) {
          // Nếu sản phẩm đã có trong wishlist tạm thời, xóa nó
          const updatedWishlist = tempWishlist.filter((p) => p !== product);
          res.setHeader(
            "Set-Cookie",
            `tempWishlist=${JSON.stringify(updatedWishlist)}; Path=/; HttpOnly;`
          );
          return res.json({ message: "Product removed from temporary wishlist", product });
        } else {
          // Nếu sản phẩm chưa có, thêm vào
          tempWishlist.push(product);
          res.setHeader(
            "Set-Cookie",
            `tempWishlist=${JSON.stringify(tempWishlist)}; Path=/; HttpOnly;`
          );
          return res.json({ message: "Product added to temporary wishlist", product });
        }
      }
    }

    if (req.method === "GET") {
      if (userEmail) {
        // Người dùng đã đăng nhập, lấy wishlist từ cơ sở dữ liệu
        const wishlist = await WishedProduct.find({ userEmail }).populate("product");
        return res.json(wishlist);
      } else {
        // Người dùng chưa đăng nhập, lấy wishlist tạm thời từ cookie
        const tempWishlist = req.cookies.tempWishlist
          ? JSON.parse(req.cookies.tempWishlist)
          : [];
        return res.json({ tempWishlist });
      }
    }

    // Phương thức không được hỗ trợ
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Error occurred during request handling:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
