import Head from 'next/head';
import Script from 'next/script';
import Header from "@/components/Header";
import Featured from "@/components/Featured";
import NewProducts from "@/components/NewProducts";
import Footer from "@/components/FooterBox";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Setting } from "@/models/Setting";

export default function HomePage({ featuredProduct, newProducts, wishedNewProducts }) {
  return (
    <div>
      <Head>
        <title>ManhEcommerce</title>
        <meta name="description" content="WEBSITE bán lẻ trực tuyến, chuyên gia dụng đảm bảo không đắt cực rẻ và chất lượng." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Script
        src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"
        strategy="lazyOnload"
      />
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} wishedProducts={wishedNewProducts} />
      <Footer />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  try {
    await mongooseConnect();

    const featuredProductSetting = await Setting.findOne({ name: 'featuredProductId' });
    const featuredProductId = featuredProductSetting?.value || null;
    const featuredProduct = featuredProductId
      ? await Product.findById(featuredProductId)
      : null;

    const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 });

    const session = await getServerSession(ctx.req, ctx.res, authOptions);

    const wishedNewProducts = session?.user
      ? await WishedProduct.find({
          userEmail: session.user.email,
          product: newProducts.map((p) => p._id.toString()),
        })
      : [];

    return {
      props: {
        featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
        newProducts: JSON.parse(JSON.stringify(newProducts)),
        wishedNewProducts: wishedNewProducts.map((i) => i.product.toString()),
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        featuredProduct: null,
        newProducts: [],
        wishedNewProducts: [],
      },
    };
  }
}
