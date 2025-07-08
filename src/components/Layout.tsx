import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Navbar";
import { LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import ModalConfirmation, { openModal } from "./Modal";
import useAuth from "../hooks/useAuth";

export default function Layout() {
    useAuth()
    const navigate = useNavigate()
    const [open, setOpen] = useState(true)
    const logout = () => { localStorage.clear(); navigate("/login") }

    return <div className="flex h-screen">
        <MobileNavbar open={!open} setOpen={setOpen} />
        <TableLaptopNavbar open={open} />

        <div className="w-full flex flex-col grow">
            <div className="h-[6vh] shrink-0 bg-base-300 flex justify-between items-center px-7 border-l-base-100 border-l">
                <Menu onClick={() => { setOpen(v => !v) }} className=" cursor-pointer" />
                <div className="flex gap-x-6 items-center">
                    <label className="swap swap-rotate">
                        <input type="checkbox" className="theme-controller" value="light" />
                        <svg
                            className="swap-off size-8 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>
                        <svg
                            className="swap-on size-8 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>
                    <div onClick={() => openModal('navbar-modal-desktop')} className="bg-base-300 cursor-pointer hover:bg-base-100 mt-auto">
                        <div className="flex items-center justify-center btn btn-error btn-sm">
                            <LogOut />
                            <span className="hidden md:inline">Logout</span>
                        </div>
                    </div>
                    <ModalConfirmation id="navbar-modal-desktop" message="Yakin ingin logout?" clickAction={logout} />
                </div>
            </div>
            <div className="grow p-3 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    </div>
}


function MobileNavbar({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    return <>
        <motion.div animate={{ x: !open ? "-100vw" : 0 }} transition={{ type: "linear" }} className="md:hidden w-2/3 fixed shrink-0 left-0 top-0 bottom-0 bg-base-200 overflow-hidden z-50">
            <Sidebar />
        </motion.div>

        <AnimatePresence>
            {open && <motion.div
                onClick={() => setOpen(true)}
                animate={{ opacity: [0, 0.5] }}
                exit={{ opacity: 0 }}
                className={`fixed inset-0 bg-black z-40 ${open && "md:hidden"}`}>
            </motion.div>}
        </AnimatePresence>
    </>
}

function TableLaptopNavbar({ open }: { open: boolean }) {
    return <motion.div animate={{ width: open ? "17%" : 0 }} className="hidden md:block shrink-0 h-full bg-base-200 overflow-hidden">
        <Sidebar />
    </motion.div>
}