import { ArrowLeft } from "lucide-react"
import { useState, type JSX } from "react"
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from "react-router-dom"
import navigations from "../config/navigations"

export default function Sidebar({ children }: { children: JSX.Element[] }) {
    return <div className="flex flex-col h-full">
        <div className="p-3 bg-base-300 text-center font-bold text-2xl">ADMIN</div>

        {navigations.map((n, i) => {
            if (n.navs) return <NavDropDown key={i} icon={n.icon} title={n.title} navigations={n.navs} />
            if (n.to) return <Nav key={i} icon={n.icon} title={n.title} to={n.to} />
        })}

        {children}
    </div>
}

const Nav = ({ title, to, icon }: { title: string; to: string; icon: JSX.Element }) => {
    return <NavLink to={to} className="bg-base-300 p-2 cursor-pointer hover:bg-base-100 ">
        <div className="flex gap-x-2 items-center">
            {icon}
            <span className="font-semibold mr-auto">{title}</span>
        </div>
    </NavLink>
}

const NavDropDown = ({ title, icon, navigations}: { title: string; icon: JSX.Element; navigations: { name: string; to: string; }[] }) => {
    const [open, setOpen] = useState(false)

    return <>
        <div className="bg-base-300 p-2 cursor-pointer hover:bg-base-100 ">
            <div onClick={() => setOpen(p => !p)} className="flex gap-x-2 items-center">
                {icon}
                <span className="font-semibold mr-auto">{title}</span>
                <motion.div animate={{ rotate: open ? '-90deg' : "0deg" }} >
                    <ArrowLeft />
                </motion.div>
            </div>
        </div>

        <AnimatePresence initial={false}>
            {open && (
                <motion.div
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full font-medium overflow-hidden"
                >
                    <div className="flex pl-10 p-2 flex-col gap-y-1">
                        {navigations.map((n, i) => <NavLink key={i} className={"hover:text-gray-500"} to={n.to}>{n.name}</NavLink>)}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </>
}
