import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/mainLayout";
import AuthLayout from "../layouts/authLayout";
import GuestRoute from "../components/auth/guestRoute";

// Pagine caricate dinamicamente
const Home = lazy(() => import("../views/home"));
const NotFound = lazy(() => import("../views/notFound"));

const Products = lazy(() => import("../views/products/products"));
const Product = lazy(() => import("../views/products/product"));
const CreateProduct = lazy(() => import("../views/products/createProduct"));
const EditProduct = lazy(() => import("../views/products/editProduct"));

const Login = lazy(() => import("../views/auth/login"));
const Register = lazy(() => import("../views/auth/register"));
const ForgotPassword = lazy(() => import("../views/auth/forgotPassword"));
const ResetPassword = lazy(() => import("../views/auth/resetPassword"));

const BecomeSeller = lazy(() => import("../views/emails/becomeSeller"));

const CartPage = lazy(() => import("../views/cart/cartPage"));

const Profile = lazy(() => import("../views/profile/profile"));
const Seller = lazy(() => import("../views/profile/seller"));
const Admin = lazy(() => import("../views/profile/admin"));

const Orders = lazy(() => import("../views/orders/orders"));
const Order = lazy(() => import("../views/orders/order"));

function PageLoader() {
  return (
    <div className="flex min-h-40 items-center justify-center">
      <span className="loading loading-spinner loading-lg" />
    </div>
  );
}

function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
}

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: withSuspense(<Home />) },
      { path: "/products", element: withSuspense(<Products />) },
      { path: "/products/:slug", element: withSuspense(<Product />) },
      { path: "/products/create", element: withSuspense(<CreateProduct />) },
      {
        path: "/products/:slug/edit",
        element: withSuspense(<EditProduct />),
      },
      { path: "/cart", element: withSuspense(<CartPage />) },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        element: <GuestRoute />,
        children: [
          { path: "/login", element: withSuspense(<Login />) },
          { path: "/register", element: withSuspense(<Register />) },
        ],
      },
      { path: "/profile", element: withSuspense(<Profile />) },
      { path: "/seller", element: withSuspense(<Seller />) },
      { path: "/admin", element: withSuspense(<Admin />) },
      {
        path: "/become-seller",
        element: withSuspense(<BecomeSeller />),
      },
      { path: "/profile/orders", element: withSuspense(<Orders />) },
      {
        path: "/profile/orders/:orderId",
        element: withSuspense(<Order />),
      },
      {
        path: "/forgot-password",
        element: withSuspense(<ForgotPassword />),
      },
      {
        path: "/reset-password/:token",
        element: withSuspense(<ResetPassword />),
      },
    ],
  },
  {
    path: "*",
    element: withSuspense(<NotFound />),
  },
]);
