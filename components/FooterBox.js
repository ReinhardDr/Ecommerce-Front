import styled from "styled-components";
import { RevealWrapper } from "next-reveal";
import Center from "@/components/Center";

const FooterBg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.h3`
  margin: 0 0 20px;
  font-weight: bold;
  font-size: 1.2rem;
`;

const LinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 10px;

    a {
      color: #aaa;
      text-decoration: none;
      font-size: 0.9rem;

      &:hover {
        color: #fff;
      }
    }
  }
`;

const BottomWrapper = styled.div`
  border-top: 1px solid #444;
  margin-top: 40px;
  padding-top: 20px;
  text-align: center;
  font-size: 0.9rem;
  color: #aaa;
`;

export default function Footer() {
  return (
    <FooterBg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <RevealWrapper origin={"left"} delay={0}>
              <Title>Về Chúng Tôi</Title>
              <LinksList>
                <li><a href={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}>Nhấn vào đây :-) </a></li>
                <li><a href={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}>Giới thiệu về website</a></li>
                <li><a href="https://developers.google.com/identity/protocols/oauth2/policies">Chính sách bảo mật</a></li>
                <li><a href="https://next-auth.js.org/faq">Điều khoản & Điều kiện</a></li>
                
              </LinksList>
            </RevealWrapper>
          </Column>

          <Column>
            <RevealWrapper origin={"bottom"} delay={100}>
              <Title>Chức Năng Website</Title>
              <LinksList>
                <li><a href="#">Trang Chủ</a></li>
                <li><a href={'/products'}>Tất Cả Sản Phẩm</a></li>
                <li><a href={'/categories'}>Tất Cả Hạng Mục</a></li>
                <li><a href={'/account'}>Trang Tài Khoản</a></li>
                <li><a href={'/cart'}>Trang Thanh Toán</a></li>
              </LinksList>
            </RevealWrapper>
          </Column>

          <Column>
            <RevealWrapper origin={"right"} delay={200}>
              <Title>Thông tin Liên hệ </Title>
              <LinksList>
                <li><a href="#">SDT: 099999999</a></li>
                <li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">YouTube</a></li>
                <li><a href="https://www.facebook.com/manh.xuan.nguyen.638209/">Facebook</a></li>
              </LinksList>
            </RevealWrapper>
          </Column>
        </ColumnsWrapper>

        <BottomWrapper>
          &copy; 2024 E-COMMERCE SHOP. All rights reserved.
        </BottomWrapper>
      </Center>
    </FooterBg>
  );
}
