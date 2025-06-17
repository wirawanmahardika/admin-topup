import Layout from "./components/Layout";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProductInfo from "./pages/product/Info";
import TambahProduct from "./pages/product/Tambah";
import EditProduct from "./pages/product/Edit";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />

        <Route path="product" element={<ProductInfo />} />
        <Route path="product/tambah" element={<TambahProduct />} />
        <Route path="product/edit/:id" element={<EditProduct />} />
      </Route>
    </>
  )
)

export default function App() {
  return <RouterProvider router={router} />
}