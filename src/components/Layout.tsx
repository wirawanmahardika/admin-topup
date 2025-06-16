import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Navbar";
import { LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import ModalConfirmation, { openModal } from "./Modal";

export default function Layout() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(true)
    const logout = () => { localStorage.clear(); navigate("/login") }

    return <div className="flex h-screen">
        <MobileNavbar logout={logout} open={!open} setOpen={setOpen} />
        <TableLaptopNavbar logout={logout} open={open} />

        <div className="w-full flex flex-col grow">
            <div className="h-[6vh] shrink-0 bg-base-300 flex justify-between items-center px-7 border-l-base-100 border-l">
                <Menu onClick={() => { setOpen(v => !v) }} className=" cursor-pointer" />
                <label className="flex cursor-pointer gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                    <input type="checkbox" value="light" className="toggle theme-controller" />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5" />
                        <path
                            d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                    </svg>
                </label>
            </div>
            <div className="grow p-5">
                <Outlet />
            </div>
        </div>
    </div>
}


function MobileNavbar({ logout, open, setOpen }: { logout: () => void, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    return <>
        <motion.div animate={{ x: !open ? "-100vw" : 0 }} transition={{ type: "linear" }} className="md:hidden w-2/3 fixed shrink-0 left-0 top-0 bottom-0 bg-base-200 overflow-hidden z-50">
            <Sidebar>
                <div onClick={() => openModal('navbar-modal-mobile')} className="bg-base-300 p-4 cursor-pointer hover:bg-base-100 mt-auto">
                    <div className="flex gap-x-2 items-center justify-center">
                        <LogOut />
                        <span className="font-semibold">Logout</span>
                    </div>
                </div>
                <ModalConfirmation id="navbar-modal-mobile" message="Yakin ingin logout?" clickAction={logout} />
            </Sidebar>
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

function TableLaptopNavbar({ logout, open }: { logout: () => void, open: boolean }) {
    return <motion.div animate={{ width: open ? "17%" : 0 }} className="hidden md:block shrink-0 h-full bg-base-200 overflow-hidden">
        <Sidebar>
            <div onClick={() => openModal('navbar-modal-desktop')} className="bg-base-300 p-4 cursor-pointer hover:bg-base-100 mt-auto">
                <div className="flex gap-x-2 items-center justify-center">
                    <LogOut />
                    <span className="font-semibold">Logout</span>
                </div>
            </div>
            <ModalConfirmation id="navbar-modal-desktop" message="Yakin ingin logout?" clickAction={logout} />
        </Sidebar>
    </motion.div>
}