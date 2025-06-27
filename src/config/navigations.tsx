import { Cloud, Database, Home,  } from "lucide-react";

export default [
  {
    section: "Main",
    icon: <Home size={16} />,
    navs: [
      { name: "Dashboard", to: "/" },
    ],
  },
  {
    section: "Digiflazz",
    icon: <Cloud size={16} />,
    navs: [
      { name: "Produk", to: "/product" },
      { name: "Brand", to: "/brand" },
    ],
  },
  {
    section: "Manual",
    icon: <Database size={16} />,
    navs: [
      { name: "Produk Manual", to: "/products" },
      { name: "Kategori", to: "/categories" },
      { name: "Order Manual", to: "/orders" },
    ],
  },
];