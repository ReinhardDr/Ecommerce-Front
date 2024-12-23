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
  grid-template-columns: 1.2fr .8fr;
  gap: 40px;
  margin: 40px 0;
  p {
    margin: 5px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;

export default function AccountPage() {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [addressLoaded, setAddressLoaded] = useState(true);
  const [wishlistLoaded, setWishlistLoaded] = useState(true);
  const [orderLoaded, setOrderLoaded] = useState(true);
  const [wishedProducts, setWishedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('Đơn Hàng');
  const [orders, setOrders] = useState([]);
  
  // Function to handle logout
  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }

  // Function to handle login
  async function login() {
    await signIn('google');
  }

  // Function to save address (called when user is logged in)
  function saveAddress() {
    const data = { name, email, city, streetAddress, postalCode, country };
    axios.put('/api/address', data);
  }

  // Fetch address, wishlist, and orders when the session state changes
  useEffect(() => {
    if (!session) {
      return;
    }

    setAddressLoaded(false);
    setWishlistLoaded(false);
    setOrderLoaded(false);

    // Fetch address data
    axios.get('/api/address').then(response => {
      setName(response.data?.name || '');
      setEmail(response.data?.email || '');
      setCity(response.data?.city || '');
      setPostalCode(response.data?.postalCode || '');
      setStreetAddress(response.data?.streetAddress || '');
      setCountry(response.data?.country || '');
      setAddressLoaded(true);
    }).catch(() => setAddressLoaded(true));

    // Fetch wishlist data from the database if logged in
    axios.get('/api/wishlist').then(response => {
      setWishedProducts(response.data.map(wp => wp.product));
      setWishlistLoaded(true);
    }).catch(() => setWishlistLoaded(true));

    // Fetch orders
    axios.get('/api/orders').then(response => {
      setOrders(response.data);
      setOrderLoaded(true);
    }).catch(() => setOrderLoaded(true));
  }, [session]);

  // Handle product removal from wishlist
  function productRemovedFromWishlist(idToRemove) {
    setWishedProducts(products => {
      return [...products.filter(p => p._id.toString() !== idToRemove)];
    });
  }

  // Handle adding/removing product to wishlist (with session check)
  async function toggleWishlist(productId) {
    if (session) {
      // If logged in, make API request to add/remove wishlist in the database
      const response = await axios.post('/api/wishlist', { product: productId });
      if (response.data.message === "Product removed from wishlist") {
        productRemovedFromWishlist(productId);
      } else {
        setWishedProducts(prev => [...prev, response.data.newWishedProduct.product]);
      }
    } else {
      // If not logged in, manage wishlist via cookies
      const tempWishlist = JSON.parse(localStorage.getItem('tempWishlist') || '[]');

      if (tempWishlist.includes(productId)) {
        // If product is already in the wishlist, remove it
        const updatedWishlist = tempWishlist.filter((p) => p !== productId);
        localStorage.setItem('tempWishlist', JSON.stringify(updatedWishlist));
        productRemovedFromWishlist(productId);
      } else {
        // Add product to the wishlist
        tempWishlist.push(productId);
        localStorage.setItem('tempWishlist', JSON.stringify(tempWishlist));
        setWishedProducts(prev => [...prev, { _id: productId }]); // Simulate adding product to UI
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
                  tabs={['Đơn Hàng', 'Yêu Thích']}
                  active={activeTab}
                  onChange={setActiveTab}
                />
                {activeTab === 'Đơn Hàng' && (
                  <>
                    {!orderLoaded && <Spinner fullWidth={true} />}
                    {orderLoaded && (
                      <div>
                        {orders.length === 0 && session && (
                          <p>Đơn Hàng Của Bạn Trống Hãy Thanh Toán Sản Phẩm Bạn Đặt Nha !</p>
                        )}
                        {orders.length === 0 && !session && (
                          <p>Đăng Nhập Để Xem Đơn Đặt Hàng Của Bạn</p>
                        )}
                        {orders.length > 0 && orders.map(o => (
                          <SingleOrder key={o.id } {...o} />
                        ))}
                      </div>
                    )}
                  </>
                )}
                {activeTab === 'Yêu Thích' && (
                  <>
                    {!wishlistLoaded && <Spinner fullWidth={true} />}
                    {wishlistLoaded && (
                      <WishedProductsGrid>
                        {wishedProducts.length > 0 && wishedProducts.map(wp => (
                          <ProductBox key={wp._id} {...wp} wished={true} onRemoveFromWishlist={productRemovedFromWishlist} />
                        ))}
                      </WishedProductsGrid>
                    )}
                    {wishedProducts.length === 0 && (
                      <>
                        {session && <p>Danh Sách Yêu Thích Bạn Trống Hãy Thêm Sản Phẩm Bạn Yêu Thích Nha !</p>}
                        {!session && <p>Đăng Nhập Để Thêm Sản Phẩm Yêu Thích</p>}
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
                <h2>{session ? 'Thông Tin Tài Khoản' : 'Đăng Nhập'}</h2>
                {!addressLoaded && <Spinner fullWidth={true} />}
                {addressLoaded && session && (
                  <>
                    <Input type="text" placeholder="Tên" value={name} onChange={ev => setName(ev.target.value)} />
                    <Input type="text" placeholder="Email" value={email} onChange={ev => setEmail(ev.target.value)} />
                    <CityHolder>
                      <Input type="text" placeholder="Thành Phố" value={city} onChange={ev => setCity(ev.target.value)} />
                      <Input type="text" placeholder="Mã ZIP" value={postalCode} onChange={ev => setPostalCode(ev.target.value)} />
                    </CityHolder>
                    <Input type="text" placeholder="Địa Chỉ" value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)} />
                    <Input type="text" placeholder="Đất Nước" value={country} onChange={ev => setCountry(ev.target.value)} />
                    <Button black block onClick={saveAddress}>Save</Button>
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
