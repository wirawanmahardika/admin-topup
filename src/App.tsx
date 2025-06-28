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

const router = createBrowserRouter(
// const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />

        <Route path="products" element={<ProductInfo />} />
        <Route path="product/tambah" element={<TambahProduct />} />
        <Route path="product/edit/:id" element={<EditProduct />} />

        <Route path="brands" element={<BrandInfo />} />
        <Route path="brand/tambah" element={<TambahBrand />} />
        <Route path="brand/:id/products" element={<BrandProductDetail />} />

        <Route path="transaksi" element={<TransaksiInfo />} />
      </Route>
    </>
  )
)

export default function App() {
  return <RouterProvider router={router} />
}