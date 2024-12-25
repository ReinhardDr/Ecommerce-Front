import styled, { keyframes } from "styled-components";
import Button, { ButtonStyle } from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import { primary } from "@/lib/colors";
import FlyingButton from "@/components/FlyingButton";
import HeartOutlineIcon from "@/components/icons/HeartOutlineIcon";
import HeartSolidIcon from "@/components/icons/HeartSolidIcon";
import axios from "axios";

// Animation keyframes
const flyToCart = keyframes`
  0% {
    opacity: 1;
    transform: scale(1) translate(0, 0);
  }
  100% {
    opacity: 0;
    transform: scale(0.5) translate(150px, -150px);
  }
`;

const ProductWrapper = styled.div`
  text-align: center;
  button {
    width: 90%;
    text-align: center;
    justify-content: center;
  }
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: auto;
  border-radius: 10px;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
  img {
    max-width: 100%;
    max-height: 120px;
    margin-bottom: 10px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  color: black;
  text-decoration: none;
  margin: 10px 0;
  &:visited {
    color: black;
  }
  &:hover {
    color: black;
  }
`;

const ProductInfoBox = styled.div`
  margin-top: 10px;
`;

const PriceRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #000;
`;

const WishlistButton = styled.button`
  border: 0;
  width: 40px !important;
  height: 40px;
  padding: 10px;
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  cursor: pointer;
  ${(props) =>
    props.wished
      ? `
    color: red;
  `
      : `
    color: black;
  `}
  svg {
    width: 16px;
  }
`;

const ButtonWithHover = styled(FlyingButton)`
  width: 90%;
  padding: 10px;
  font-size: 1rem;
  background-color: ${primary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 0.9;
  &:hover {
    transform: scale(1.05);
    opacity: 1;
  }
`;

const FlyImage = styled.img`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  animation: ${flyToCart} 1s ease forwards;
`;

export default function ProductBox({
  _id,
  title,
  description,
  price,
  images,
  wished = false,
  onRemoveFromWishlist = () => {},
}) {
  const url = "/product/" + _id;
  const [isWished, setIsWished] = useState(wished);
  const [isClient, setIsClient] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const { addProduct } = useContext(CartContext);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function addToWishlist(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const nextValue = !isWished;
    if (nextValue === false && onRemoveFromWishlist) {
      onRemoveFromWishlist(_id);
    }
    axios.post("/api/wishlist", { product: _id }).then(() => {});
    setIsWished(nextValue);
  }

  function handleAddToCart(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    setIsAnimating(true); // Bắt đầu hiệu ứng
    addProduct(_id);
    setTimeout(() => setIsAnimating(false), 1000); // Kết thúc hiệu ứng
  }

  if (!isClient) {
    return null;
  }

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <WishlistButton wished={isWished} onClick={addToWishlist}>
            {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
          </WishlistButton>
          <img src={images?.[0]} alt={title} />
          {isAnimating && <FlyImage src={images?.[0]} alt="Flying to cart" />}
        </div>

        <ProductInfoBox>
          <Title href={url}>{title}</Title>
          <PriceRow>
          <Price>{price.toLocaleString()} ₫</Price>
            <ButtonWithHover
              _id={_id}
              src={images?.[0]}
              onClick={handleAddToCart}
            >
              Thêm Vào Giỏ Hàng
            </ButtonWithHover>
          </PriceRow>
        </ProductInfoBox>
      </WhiteBox>
    </ProductWrapper>
  );
}
