import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { RevealWrapper } from "next-reveal";
import { useSession } from "next-auth/react";
import Footer from "@/components/FooterBox";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
  margin-bottom: 40px;
  table thead tr th:nth-child(3),
  table tbody tr td:nth-child(3),
  table tbody tr.subtotal td:nth-child(2) {
    text-align: right;
  }
  table tr.subtotal td {
    padding: 15px 0;
  }
  table tbody tr.subtotal td:nth-child(2) {
    font-size: 1.2rem;
  }
  tr.total td {
    font-weight: bold;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: column;
  text-align: center;
  font-size: 0.85rem; /* Giảm kích thước chữ */

  button {
    padding: 0 !important;
  }
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 70px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 50px;
    max-height: 50px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  font-size: 0.8rem; /* Giảm kích thước chữ */
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 6px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [shippingFee, setShippingFee] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts }).then(response => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      clearCart();
    }
    axios.get('/api/settings?name=shippingFee').then(res => {
      setShippingFee(res.data.value);
    });
  }, []);

  useEffect(() => {
    if (!session) {
      return;
    }
    axios
      .get('/api/address')
      .then(response => {
        const data = response.data || {};
        setName(data.name || '');
        setEmail(data.email || '');
        setCity(data.city || '');
        setPostalCode(data.postalCode || '');
        setStreetAddress(data.streetAddress || '');
        setCountry(data.country || '');
      })
      .catch(error => {
        console.error("Error fetching address:", error);
      });
  }, [session]);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  function validateForm() {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Tên không được để trống.";
    if (!email.trim()) newErrors.email = "Email không được để trống.";
    if (!city.trim()) newErrors.city = "Thành phố không được để trống.";
    if (!postalCode.trim()) newErrors.postalCode = "Mã zip không được để trống.";
    if (!streetAddress.trim()) newErrors.streetAddress = "Địa chỉ không được để trống.";
    if (!country.trim()) newErrors.country = "Quốc gia không được để trống.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function goToPayment() {
    if (!validateForm()) return;
    const response = await axios.post('/api/checkout', {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  let productsTotal = 0;
  for (const productId of cartProducts) {
    const price = products.find(p => p._id === productId)?.price || 0;
    productsTotal += price;
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Cảm Ơn Vì Đơn Hàng Của Bạn!</h1>
              <p>Chúng Tôi Sẽ Liên Hệ Với Bạn Khi Đơn Hàng Tới.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <RevealWrapper delay={0}>
            <Box>
              <h2>Giỏ Hàng</h2>
              {!cartProducts?.length && <div>Giỏ Bạn Đang Trống</div>}
              {products?.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>Sản Phẩm</th>
                      <th>Số Lượng</th>
                      <th>Giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product._id}>
                        <ProductInfoCell>
                          <ProductImageBox>
                            <img src={product.images[0]} alt="" />
                          </ProductImageBox>
                          <span>{product.title}</span>
                        </ProductInfoCell>
                        <td>
                          <Button onClick={() => lessOfThisProduct(product._id)}>-</Button>
                          <QuantityLabel>
                            {cartProducts.filter(id => id === product._id).length}
                          </QuantityLabel>
                          <Button onClick={() => moreOfThisProduct(product._id)}>+</Button>
                        </td>
                        <td>
                          {(cartProducts.filter(id => id === product._id).length * product.price).toLocaleString()} ₫
                        </td>
                      </tr>
                    ))}
                    <tr className="subtotal">
                      <td colSpan={2}>Sản Phẩm</td>
                      <td>{productsTotal.toLocaleString()} ₫</td>
                    </tr>
                    <tr className="subtotal">
                      <td colSpan={2}>Phí Ship</td>
                      <td>{shippingFee?.toLocaleString() || 0} ₫</td>
                    </tr>
                    <tr className="subtotal total">
                      <td colSpan={2}>Tổng</td>
                      <td>{(productsTotal + parseInt(shippingFee || 0)).toLocaleString()} ₫</td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </Box>
          </RevealWrapper>
          {!!cartProducts?.length && (
            <RevealWrapper delay={100}>
              <Box>
                <h2>Thông Tin Đơn Hàng</h2>
                <Input
                  type="text"
                  placeholder="Tên"
                  value={name}
                  name="name"
                  onChange={ev => setName(ev.target.value)}
                />
                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={ev => setEmail(ev.target.value)}
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                <CityHolder>
                  <Input
                    type="text"
                    placeholder="Thành Phố"
                    value={city}
                    name="city"
                    onChange={ev => setCity(ev.target.value)}
                  />
                  {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
                  <Input
                    type="text"
                    placeholder="Mã Zip"
                    value={postalCode}
                    name="postalCode"
                    onChange={ev => setPostalCode(ev.target.value)}
                  />
                  {errors.postalCode && <ErrorMessage>{errors.postalCode}</ErrorMessage>}
                </CityHolder>
                <Input
                  type="text"
                  placeholder="Địa Chỉ"
                  value={streetAddress}
                  name="streetAddress"
                  onChange={ev => setStreetAddress(ev.target.value)}
                />
                {errors.streetAddress && <ErrorMessage>{errors.streetAddress}</ErrorMessage>}
                <Input
                  type="text"
                  placeholder="Quốc Gia"
                  value={country}
                  name="country"
                  onChange={ev => setCountry(ev.target.value)}
                />
                {errors.country && <ErrorMessage>{errors.country}</ErrorMessage>}
                <Button black block onClick={goToPayment}>
                  Tiếp Tục Thanh Toán
                </Button>
              </Box>
            </RevealWrapper>
          )}
        </ColumnsWrapper>
      </Center>
      <Footer />
    </>
  );
}
