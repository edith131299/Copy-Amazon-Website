import "./App.css";
import Home from "./component/Home";
import Footer from "./component/layout/Footer";
import Header from "./component/layout/header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import ProductDetails from "./component/Product/ProductDetails";
import ProductSearch from "./component/Product/ProductSearch";
import Login from "./component/user/Login";
import Register from "./component/user/Register";
import { useEffect, useState } from "react";
import Store from "./Store";
import { loadUserAction } from "./component/actions/LoginAction";
import Profile from "./component/user/Profile";
import UpdateProfile from "./component/user/updateProfile";
import { ProtectedRoute } from "./component/route/Protected-Route";
import UpdatePassword from "./component/user/UpdatePassword";
import ForgotPassword from "./component/user/ForgotPassword";
import ResetPassword from "./component/user/ResetPassword";
import Cart from "./component/cart/Cart";
import Shipping from "./component/cart/Shipping";
import ConfirmOrder from "./component/cart/ConfirmOrder";
import Payment from "./component/cart/Payment";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/cart/OrderSuccess";
import UserOrders from "./component/order/UserOrders";
import OrderDetails from "./component/order/OrderDetails";
import Dashboard from "./component/admin/dashboard";
import ProductsList from "./component/admin/productsList";
import CreateProduct from "./component/admin/createProduct";
import UpdateProduct from "./component/admin/updateProduct";
import OrdersList from "./component/admin/orderList";
import UpdateOrder from "./component/admin/updateOrder";
import UserList from "./component/admin/userList";
import UpdateUser from "./component/admin/updateUser";
import ReviewList from "./component/admin/reviewList";

function App() {
  const [stripe, setStripe] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("isAuth");
    console.log(auth, typeof auth);
    if (auth === "true") {
      Store.dispatch(loadUserAction);
      async function getStripeKey() {
        const { data } = await axios.get("/api/v1/stripeapi");
        setStripe(data.stripeApiKey);
      }
      getStripeKey();
    }
  }, []);
  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header />
          <div className="container container-fluid">
            <ToastContainer theme="dark" />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/product/:id" element={<ProductDetails />}></Route>
              <Route
                path="/search/:keyword"
                element={<ProductSearch />}
              ></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route
                path="/myprofile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/myprofile/update"
                element={
                  <ProtectedRoute>
                    <UpdateProfile />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/myprofile/update/password"
                element={
                  <ProtectedRoute>
                    <UpdatePassword />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/password/forgot"
                element={<ForgotPassword />}
              ></Route>
              <Route
                path="/password/reset/:token"
                element={<ResetPassword />}
              ></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route
                path="/shipping"
                element={
                  <ProtectedRoute>
                    <Shipping />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/order/confirm"
                element={
                  <ProtectedRoute>
                    <ConfirmOrder />
                  </ProtectedRoute>
                }
              ></Route>
              {stripe && (
                <Route
                  path="/payment"
                  element={
                    <ProtectedRoute>
                      <Elements stripe={loadStripe(stripe)}>
                        <Payment />
                      </Elements>
                    </ProtectedRoute>
                  }
                ></Route>
              )}
              <Route
                path="/order/success"
                element={
                  <ProtectedRoute>
                    <OrderSuccess />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <UserOrders />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderDetails />
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>
          </div>
          {/* Admin Routes */}
          <Routes>
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute isAdmin={true}>
                  <Dashboard />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute isAdmin={true}>
                  <ProductsList />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/products/create"
              element={
                <ProtectedRoute isAdmin={true}>
                  <CreateProduct />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/product/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UpdateProduct />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute isAdmin={true}>
                  <OrdersList />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/order/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UpdateOrder />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UserList />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/user/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UpdateUser />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/reviews"
              element={
                <ProtectedRoute isAdmin={true}>
                  <ReviewList />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>

          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
