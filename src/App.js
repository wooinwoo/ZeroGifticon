import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import TopButton from "./components/TopButton";

import Login from "./pages/Login";
import Shop from "./pages/Shop";
import ShopDetail from "./pages/ShopDetail";
import Gift from "./pages/Gift";
import Notification from "./pages/Notification";
import GiftBox from "./pages/GiftBox";
import GiftBoxDetail from "./pages/GiftBoxDetail";
import ThankYou from "./pages/ThankYou";
import Review from "./pages/Review";
import MyProduct from "./pages/MyProduct";
import EditMyProduct from "./pages/EditMyProduct";
import KakaoLogin from "./pages/KakaoLogin";
import NotFoundPage from "./pages/NotFoundPage";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <>
      <TopButton />
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route index element={<Login />} />
              <Route path="login">
                <Route index element={<Login />} />
                <Route path="oauth" element={<KakaoLogin />} />
              </Route>
              <Route path="shop">
                <Route index element={<Shop />} />
                <Route path="shop-detail" element={<ShopDetail />} />
                <Route path="gift" element={<Gift />} />
              </Route>
              <Route path="gift-box">
                <Route index element={<GiftBox />} />
                <Route
                  path="gift-box-detail/:giftId"
                  element={<GiftBoxDetail />}
                />
              </Route>
              <Route path="my-product">
                <Route index element={<MyProduct />} />
                <Route path="edit-product" element={<EditMyProduct />} />
              </Route>
              <Route path="review" element={<Review />} />
              <Route path="thank" element={<ThankYou />} />
              <Route path="notification" element={<Notification />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </>
  );
}
export default App;
