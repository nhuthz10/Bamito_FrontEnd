import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Favourite from "../../pages/favourite/Favourite";
import FeedBack from "../../pages/feedBack/FeedBack";
import Cart from "../../pages/cart/Cart";
import Profile from "../../pages/profile/Profile";
import OrdersDetail from "../../pages/ordersDetail/OrdersDetail";
import Error from "../../pages/error/Error";
import Layout from "../../layout/Layout/Layout";
import OrdersHistory from "../../pages/ordersHistory/OrdersHistory";
import { path } from "../../utils";
import { useEffect } from "react";

var userPages = [
  {
    path: "cart",
    element: (
      <Layout>
        <Cart />
      </Layout>
    ),
  },
  {
    path: "profile",
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },
  {
    path: "orders",
    element: (
      <Layout>
        <OrdersHistory />
      </Layout>
    ),
  },
  {
    path: "orders/:orderId",
    element: (
      <Layout>
        <OrdersDetail />
      </Layout>
    ),
  },
  {
    path: "feedback",
    element: (
      <Layout>
        <FeedBack />
      </Layout>
    ),
  },
  {
    path: "favourite",
    element: (
      <Layout>
        <Favourite />
      </Layout>
    ),
  },
  {
    path: "*",
    element: <Error />,
  },
];

function UserRoutes() {
  const navigate = useNavigate();
  const login = useSelector((state) => state.user.login);
  useEffect(() => {
    if (!login) {
      navigate(path.HOME);
    }
  }, [login, navigate]);

  return (
    <Routes>
      {userPages.map((page, index) => {
        return <Route path={page.path} element={page.element} key={index} />;
      })}
    </Routes>
  );
}

export default UserRoutes;
