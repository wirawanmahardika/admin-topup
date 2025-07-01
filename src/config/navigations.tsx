import { Cloud, Database, Home,  } from "lucide-react";

export default [
  {
    section: "Main",
    icon: <Home size={16} />,
    navs: [
      { name: "Dashboard", to: "/" },
      { name: "Transaksi", to: "/transaksi" },
    ],
  },
  {
    section: "Digiflazz",
    icon: <Cloud size={16} />,
    navs: [
      { name: "Produk", to: "/products" },
      { name: "Brand", to: "/brands" },
    ],
  },
  {
    section: "Manual",
    icon: <Database size={16} />,
    navs: [
      { name: "Produk Manual", to: "/productasdf" },
      { name: "Kategori", to: "/categories" },
      { name: "Order Manual", to: "/orders" },
    ],
  },
];