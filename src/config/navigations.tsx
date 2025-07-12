import { Home, Package, FileText, User } from "lucide-react";

export default [
  {
    section: "Dashboard",
    icon: <Home size={16} />,
    navs: [
      { name: "Dashboard", to: "/" },
    ],
  },
  {
    section: "Transaksi & Laporan",
    icon: <FileText size={16} />,
    navs: [
      { name: "Transaksi", to: "/transaksi" },
      { name: "Pembayaran", to: "/payment" },
    ],
  },
  {
    section: "Produk & Brand",
    icon: <Package size={16} />,
    navs: [
      { name: "Produk", to: "/products" },
      { name: "Brand", to: "/brands" },
    ],
  },
  {
    section: "Profil",
    icon: <User size={16} />,
    navs: [
      { name: "Info", to: "/profile" },
      { name: "Edit", to: "/edit-profile" },
      { name: "Tambah Saldo", to: "/tambah-saldo" },
    ],
  },
];