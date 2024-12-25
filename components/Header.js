import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
import SearchIcon from "@/components/icons/SearchIcon";

const StyledHeader = styled.header`
  background-color: #222;
  position:sticky;
  top:0;
  z-index:10;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 5;
  font-size: 1.12rem; /* Tăng kích thước chữ */
  font-family: 'Great Vibes', cursive; /* Font chữ thư pháp phong cách Ý */
  font-weight: 400; /* Độ đậm vừa phải */
  letter-spacing: 1px; /* Tăng khoảng cách giữa các ký tự */
  text-transform: capitalize; /* Viết hoa chữ cái đầu */
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  ${props => props.mobileNavActive ? `
    display: block;
  ` : `
    display: none;
  `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  display: block;
  color: #aaa; /* Màu chữ mặc định */
  text-decoration: none;
  min-width: 30px;
  padding: 10px 0;
  position: relative;
  transition: color 0.3s, transform 0.3s; /* Hiệu ứng màu và scale */

  &:hover {
    color: #fff; /* Màu trắng sáng hơn */
    transform: scale(1.05); /* Phóng nhẹ chữ khi hover */
  }

  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border:0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const SideIcons = styled.div`
  display: flex;
  align-items: center;
  a{
    display:inline-block;
    min-width:20px;
    color:white;
    svg{
      width:14px;
      height:14px;
    }
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/'}>AnhManhGiaDung</Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={'/'}>Trang Chủ</NavLink>
            <NavLink href={'/products'}>Tất Cả Sản Phẩm</NavLink>
            <NavLink href={'/categories'}>Phân Loại Sản Phẩm</NavLink>
            <NavLink href={'/account'}>Tài Khoản</NavLink>
            <NavLink href={'/cart'}>Giỏ Hàng ({cartProducts.length})</NavLink>
          </StyledNav>
          <SideIcons>
            <Link href={'/search'}><SearchIcon /></Link>
            <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
              <BarsIcon />
            </NavButton>
          </SideIcons>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
  
}
