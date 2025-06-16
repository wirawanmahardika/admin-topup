import { BarChart3, Users } from 'lucide-react'
import type { JSX } from 'react';

const navigations: { title: string; icon: JSX.Element, to?: string; navs?: any[] }[] = [
    {
        title: "Dashboard",
        to: "/",
        icon: <BarChart3 />
    },
    {
        title: "Users",
        icon: <Users />,
        navs: [
            { to: "/users", name: "info" },
            { to: "/user/create", name: "create" }
        ]
    },
]

export default navigations