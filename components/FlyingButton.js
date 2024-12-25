import styled from "styled-components";
import { ButtonStyle } from "@/components/Button";
import { primary } from "@/lib/colors";
import { CartContext } from "@/components/CartContext";
import { useContext, useRef } from "react";

const FlyingButtonWrapper = styled.div`
  button {
    ${ButtonStyle};
    ${(props) =>
      props.main
        ? `
      background-color: ${primary};
      color: white;
    `
        : `
      background-color: transparent;
      border: 1px solid ${primary};
      color: ${primary};
    `}
    ${(props) =>
      props.white &&
      `
      background-color: white;
      border: 1px solid white;
      font-weight: 500;
    `}
  }

  @keyframes fly {
    0% {
      opacity: 1;
      transform: scale(1) translate(0, 0);
    }
    100% {
      opacity: 0;
      transform: scale(0.5) translate(200px, -300px); /* Thay đổi hướng và khoảng cách */
    }
  }

  img {
    display: none;
    max-width: 100px;
    max-height: 100px;
    position: fixed;
    z-index: 5;
    border-radius: 10px;
    pointer-events: none; /* Để không chặn sự kiện chuột */
  }

  .fly {
    display: block;
    animation: fly 1s ease-in-out forwards;
  }
`;

export default function FlyingButton(props) {
  const { addProduct } = useContext(CartContext);
  const imgRef = useRef();

  function sendImageToCart(ev) {
    if (!imgRef.current) return; // Bảo vệ null

    // Đặt vị trí ảnh tại vị trí nút
    const buttonRect = ev.target.getBoundingClientRect();
    imgRef.current.style.left = `${buttonRect.left + buttonRect.width / 2 - 50}px`;
    imgRef.current.style.top = `${buttonRect.top + buttonRect.height / 2 - 50}px`;

    // Hiển thị ảnh với hiệu ứng
    imgRef.current.classList.add("fly");

    // Ẩn ảnh sau khi hiệu ứng kết thúc
    setTimeout(() => {
      if (imgRef.current) {
        imgRef.current.classList.remove("fly");
      }
    }, 1000);
  }

  return (
    <FlyingButtonWrapper white={props.white} main={props.main}>
      <img src={props.src} alt="Flying Product" ref={imgRef} />
      <button
        onClick={(ev) => {
          sendImageToCart(ev); // Gọi hiệu ứng "bay"
          addProduct(props._id); // Thêm sản phẩm vào giỏ hàng
        }}
        {...props}
      >
        {props.children}
      </button>
    </FlyingButtonWrapper>
  );
}
