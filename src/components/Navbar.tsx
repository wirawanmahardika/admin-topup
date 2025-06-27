import {  type JSX } from "react"
import { NavLink } from "react-router-dom"
import navigations from "../config/navigations"

export default function Sidebar({ children }: { children?: JSX.Element[] }) {
    return (
        <div className="flex flex-col h-full bg-base-200 shadow-lg rounded-r-2xl overflow-hidden">
            <div className="p-4 bg-base-300 text-center font-extrabold text-2xl tracking-widest border-b border-base-100">
                ADMIN
            </div>
            <nav className="flex-1 py-4 px-2 space-y-4">
                {navigations.map((section, i) => (
                    <div key={i}>
                        <div className="flex items-center gap-2 px-3 py-1 text-xs font-bold text-gray-400 uppercase tracking-wide">
                            {section.icon}
                            {section.section}
                        </div>
                        <div className="flex flex-col gap-1 mt-1">
                            {section.navs.map((n, j) => (
                                <NavLink
                                    key={j}
                                    to={n.to}
                                    className={({ isActive }) =>
                                        "flex items-center gap-2 rounded-lg px-4 py-2 transition-all duration-150 " +
                                        (isActive
                                            ? "bg-primary/10 border-l-4 border-primary text-primary font-bold shadow"
                                            : "hover:bg-base-100 text-base-content")
                                    }
                                >
                                    <span>{n.name}</span>
                                </NavLink>
                            ))}
                        </div>
                        {i < navigations.length - 1 && (
                            <div className="my-3 border-t border-base-300" />
                        )}
                    </div>
                ))}
            </nav>
            <div className="p-2">{children}</div>
        </div>
    );
}