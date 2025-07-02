import type { JSX } from "react";

export default function ChartCard({children}: {children: JSX.Element}) {
    return <div className="card bg-base-200 shadow">
        <div className="card-body">
            {children}
        </div>
    </div>
}