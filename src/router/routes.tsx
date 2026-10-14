import { createBrowserRouter } from "react-router";

import MainLayout from '../layouts/mainLayout';
import AuthLayout from '../layouts/authLayout';

import Home from '../views/home';
import NotFound from '../views/notFound';

import Products from '../views/products/products';
import Product from '../views/products/product';
import CreateProduct from '../views/products/createProduct';
import EditProduct from '../views/products/editProduct';

import Login from '../views/auth/login';
import Register from '../views/auth/register';

import BecomeSeller from "../views/emails/becomeSeller";

import CartPage from "../views/cart/cartPage";

import Profile from "../views/profile/profile";
import Seller from "../views/profile/seller";
import Orders from "../views/profile/orders";


export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:slug",
        element: <Product />,
      },
      {
        path: "/products/create",
        element: <CreateProduct />,
      },
      {
        path: "/products/:slug/edit",
        element: <EditProduct />,
      },
      {
        path: "/cart",
        element: <CartPage />
      }
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/seller",
        element: <Seller />
      },
      {
        path: "/become-seller",
        element: <BecomeSeller />
      },
      {
        path: "/profile/orders",
        element: <Orders />
      }
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
