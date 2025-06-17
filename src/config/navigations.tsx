import { BarChart3, Package,  } from 'lucide-react'
import type { JSX } from 'react';

const navigations: { title: string; icon: JSX.Element, to?: string; navs?: any[] }[] = [
    {
        title: "Dashboard",
        to: "/",
        icon: <BarChart3 />
    },
    {
        title: "Product",
        to: "/product",
        icon: <Package />,
        // navs: [
        //     { to: "/product", name: "info" },
        //     { to: "/product/create", name: "create" }
        // ]
    },
]

export default navigations