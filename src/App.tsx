import Layout from "./components/Layout";
import {
  createBrowserRouter,
  // createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProductInfo from "./pages/product/Info";
import TambahProduct from "./pages/product/Tambah";
import EditProduct from "./pages/product/Edit";
import TransaksiInfo from "./pages/transaksi/Info";
import BrandInfo from "./pages/brand/Info";
import BrandProductDetail from "./pages/brand/ProductDetail";
import TambahBrand from "./pages/brand/Tambah";
import EditBrand from "./pages/brand/Edit";
import ProfileInfo from "./pages/profile/Info";
import EditProfil from "./pages/profile/Edit";
import TambahSaldo from "./pages/profile/TambahSaldo";
import PaymentInfo from "./pages/payment/Info";
import EditPayment from "./pages/payment/Edit";
import TambahPayment from "./pages/payment/Tambah";
import DetailBrand from "./pages/brand/Detail";

const router = createBrowserRouter(
// const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="transaksi" element={<TransaksiInfo />} />

        <Route path="profile" element={<ProfileInfo />} />
        <Route path="profile/edit" element={<EditProfil />} />

        <Route path="products" element={<ProductInfo />} />
        <Route path="product/edit/:id" element={<EditProduct />} />

        <Route path="brands" element={<BrandInfo />} />
        <Route path="brand/detail/:id" element={<DetailBrand />} />
        <Route path="brand/tambah" element={<TambahBrand />} />
        <Route path="brand/:id/products" element={<BrandProductDetail />} />
        <Route path="brand/edit/:id" element={<EditBrand />} />
        <Route path="brand/:id/product/tambah" element={<TambahProduct />} />


        <Route path="payment" element={<PaymentInfo />} />
        <Route path="payment/tambah" element={<TambahPayment />} />
        <Route path="payment/:id/edit" element={<EditPayment />} />

        <Route path="profile" element={<ProfileInfo />} />
        <Route path="edit-profile" element={<EditProfil />} />
        <Route path="tambah-saldo" element={<TambahSaldo />} />
      </Route>
    </>
  )
)

export default function App() {
  return <RouterProvider router={router} />
}