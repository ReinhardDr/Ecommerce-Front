import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import CartIcon from "@/components/icons/CartIcon";
import FlyingButton from "@/components/FlyingButton";
import ProductReviews from "@/components/ProductReviews";
import { useState, useEffect } from "react";
import TopicBox from "@/components/TopicBox";
import DescriptionBox from "@/components/DescriptionBox";
import axios from "axios";
import { HeartIcon } from "lucide-react";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Price = styled.span`
  font-size: 1.4rem;
  font-weight: bold;
  color: #000;
`;

const WishlistButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  color: ${props => props.isWished ? '#ff0000' : '#666'};
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`;

export default function ProductPage({ product }) {
  const [showMore, setShowMore] = useState(false);
  const [isWished, setIsWished] = useState(false);
  
  useEffect(() => {
    checkWishlistStatus();
  }, []);

  const checkWishlistStatus = async () => {
    try {
      const response = await axios.get('/api/wishlist');
      const wishlist = response.data;
      
      if (Array.isArray(wishlist)) {
        setIsWished(wishlist.some(item => item.product?._id === product._id));
      } else if (wishlist.tempWishlist) {
        setIsWished(wishlist.tempWishlist.includes(product._id));
      }
    } catch (error) {
      console.error('Lỗi kèo check icon:', error);
    }
  };

  const toggleWishlist = async () => {
    try {
      await axios.post('/api/wishlist', {
        product: product._id
      });
      setIsWished(!isWished);
    } catch (error) {
      console.error('Lỗi giao diện ko bật tắt :', error);
    }
  };

  const toggleShowMore = () => setShowMore(!showMore);
  const topicLines = typeof product.topic === "string" ? product.topic.split("\n") : [];
  const hasMore = topicLines.length > 4;

  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <DescriptionBox>
              <table>
                <tbody>
                  {product.description.split("\n").map((line, index) => (
                    <tr key={index}>
                      <td>{line}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </DescriptionBox>
            <PriceRow>
              <Price>{product.price.toLocaleString()} ₫</Price>
              <FlyingButton main _id={product._id} src={product.images?.[0]}>
                <CartIcon /> Thêm Vào Giỏ Hàng
              </FlyingButton>
              <WishlistButton onClick={toggleWishlist} isWished={isWished}>
                <HeartIcon size={24} fill={isWished ? '#ff0000' : 'none'} />
              </WishlistButton>
            </PriceRow>
          </div>
        </ColWrapper>

        {product.topic && (
          <TopicBox showMore={showMore}>
            <div className="topic-title">Mô Tả Sản Phẩm</div>
            <div className="topic-description">
              {topicLines.slice(0, showMore ? topicLines.length : 5).map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
            {hasMore && (
              <button className="see-more-btn" onClick={toggleShowMore}>
                {showMore ? "Thu Gọn" : "Xem Thêm Các Tính Năng"}
              </button>
            )}
          </TopicBox>
        )}

        <ProductReviews product={product} />
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id).lean();
  product.topic = product.topic || "";
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}