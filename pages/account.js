import Header from "@/components/Header";
import Title from "@/components/Title";
import Center from "@/components/Center";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "@/components/Button";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import { RevealWrapper } from "next-reveal";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import ProductBox from "@/components/ProductBox";
import Tabs from "@/components/Tabs";
import SingleOrder from "@/components/SingleOrder";

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin: 40px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Chuyển về 1 cột trên màn hình nhỏ */
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;

  @media (max-width: 768px) {
    flex-direction: column; /* Sắp xếp theo cột khi màn hình nhỏ */
  }
`;

const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Hiển thị 1 sản phẩm mỗi hàng trên màn hình nhỏ */
  }
`;

export default function AccountPage() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [addressLoaded, setAddressLoaded] = useState(true);
  const [wishlistLoaded, setWishlistLoaded] = useState(true);
  const [orderLoaded, setOrderLoaded] = useState(true);
  const [wishedProducts, setWishedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("Đơn Hàng");
  const [orders, setOrders] = useState([]);

  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }

  async function login() {
    await signIn("google");
  }

  function saveAddress() {
    const data = { name, email, city, streetAddress, postalCode, country };
    axios.put("/api/address", data);
  }

  useEffect(() => {
    if (!session) return;

    setAddressLoaded(false);
    setWishlistLoaded(false);
    setOrderLoaded(false);

    axios
      .get("/api/address")
      .then((response) => {
        setName(response.data?.name || "");
        setEmail(response.data?.email || "");
        setCity(response.data?.city || "");
        setPostalCode(response.data?.postalCode || "");
        setStreetAddress(response.data?.streetAddress || "");
        setCountry(response.data?.country || "");
        setAddressLoaded(true);
      })
      .catch(() => setAddressLoaded(true));

    axios
      .get("/api/wishlist")
      .then((response) => {
        setWishedProducts(response.data.map((wp) => wp.product));
        setWishlistLoaded(true);
      })
      .catch(() => setWishlistLoaded(true));

    axios
      .get("/api/orders")
      .then((response) => {
        setOrders(response.data);
        setOrderLoaded(true);
      })
      .catch(() => setOrderLoaded(true));
  }, [session]);

  function productRemovedFromWishlist(idToRemove) {
    setWishedProducts((products) =>
      products.filter((p) => p._id.toString() !== idToRemove)
    );
  }

  async function toggleWishlist(productId) {
    if (session) {
      const response = await axios.post("/api/wishlist", { product: productId });
      if (response.data.message === "Product removed from wishlist") {
        productRemovedFromWishlist(productId);
      } else {
        setWishedProducts((prev) => [
          ...prev,
          response.data.newWishedProduct.product,
        ]);
      }
    } else {
      const tempWishlist = JSON.parse(localStorage.getItem("tempWishlist") || "[]");
      if (tempWishlist.includes(productId)) {
        const updatedWishlist = tempWishlist.filter((p) => p !== productId);
        localStorage.setItem("tempWishlist", JSON.stringify(updatedWishlist));
        productRemovedFromWishlist(productId);
      } else {
        tempWishlist.push(productId);
        localStorage.setItem("tempWishlist", JSON.stringify(tempWishlist));
        setWishedProducts((prev) => [...prev, { _id: productId }]);
      }
    }
  }

  return (
    <>
      <Header />
      <Center>
        <ColsWrapper>
          <div>
            <RevealWrapper delay={0}>
              <WhiteBox>
                <Tabs
                  tabs={["Đơn Hàng", "Yêu Thích"]}
                  active={activeTab}
                  onChange={setActiveTab}
                />
                {activeTab === "Đơn Hàng" && (
                  <>
                    {!orderLoaded && <Spinner fullWidth={true} />}
                    {orderLoaded && (
                      <div>
                        {orders.length === 0 && session && (
                          <p>Đơn Hàng Của Bạn Trống. Hãy Đặt Mua Sản Phẩm!</p>
                        )}
                        {orders.length === 0 && !session && (
                          <p>Đăng Nhập Để Xem Đơn Đặt Hàng Của Bạn</p>
                        )}
                        {orders.length > 0 &&
                          orders.map((o) => <SingleOrder key={o.id} {...o} />)}
                      </div>
                    )}
                  </>
                )}
                {activeTab === "Yêu Thích" && (
                  <>
                    {!wishlistLoaded && <Spinner fullWidth={true} />}
                    {wishlistLoaded && (
                      <WishedProductsGrid>
                        {wishedProducts.length > 0 &&
                          wishedProducts.map((wp) => (
                            <ProductBox
                              key={wp._id}
                              {...wp}
                              wished={true}
                              onRemoveFromWishlist={productRemovedFromWishlist}
                            />
                          ))}
                      </WishedProductsGrid>
                    )}
                    {wishedProducts.length === 0 && (
                      <>
                        {session && (
                          <p>
                            Danh Sách Yêu Thích Bạn Trống. Hãy Thêm Sản Phẩm Bạn Yêu
                            Thích!
                          </p>
                        )}
                        {!session && (
                          <p>Đăng Nhập Để Thêm Sản Phẩm Yêu Thích</p>
                        )}
                      </>
                    )}
                  </>
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>
          <div>
            <RevealWrapper delay={100}>
              <WhiteBox>
                <h2>{session ? "Thông Tin Tài Khoản" : "Đăng Nhập"}</h2>
                {!addressLoaded && <Spinner fullWidth={true} />}
                {addressLoaded && session && (
                  <>
                    <Input
                      type="text"
                      placeholder="Tên"
                      value={name}
                      onChange={(ev) => setName(ev.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(ev) => setEmail(ev.target.value)}
                    />
                    <CityHolder>
                      <Input
                        type="text"
                        placeholder="Thành Phố"
                        value={city}
                        onChange={(ev) => setCity(ev.target.value)}
                      />
                      <Input
                        type="text"
                        placeholder="Mã ZIP"
                        value={postalCode}
                        onChange={(ev) => setPostalCode(ev.target.value)}
                      />
                    </CityHolder>
                    <Input
                      type="text"
                      placeholder="Địa Chỉ"
                      value={streetAddress}
                      onChange={(ev) => setStreetAddress(ev.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Đất Nước"
                      value={country}
                      onChange={(ev) => setCountry(ev.target.value)}
                    />
                    <Button black block onClick={saveAddress}>
                      Lưu
                    </Button>
                    <hr />
                  </>
                )}
                {session && <Button primary onClick={logout}>Đăng Xuất</Button>}
                {!session && <Button primary onClick={login}>Đăng Nhập Bằng Google</Button>}
              </WhiteBox>
            </RevealWrapper>
          </div>
        </ColsWrapper>
      </Center>
    </>
  );
}
