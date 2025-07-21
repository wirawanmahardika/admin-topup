import { ArrowLeft, Copy } from "lucide-react";
import { NavLink } from "react-router-dom";
import type { transactionType } from "../../../types/transactionType";
import { useState } from "react";

type props = {
    transactionData: transactionType;
}

export function Header({ transactionData }: props) {
    const [copied, setCopied] = useState(false);
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return <div className="navbar bg-base-200 shadow-lg">
        <div className="navbar-start">
            <NavLink to={"/transaksi"} className="btn btn-ghost btn-square">
                <ArrowLeft className="w-5 h-5" />
            </NavLink>
            <div className="ml-4">
                <h1 className="text-xl font-bold">Detail Transaksi</h1>
                <p className="text-sm text-base-content/70">#{transactionData.id}</p>
            </div>
        </div>
        <div className="navbar-end">
            <button
                onClick={() => copyToClipboard(transactionData.id)}
                className="btn btn-outline btn-sm gap-2"
            >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy ID'}
            </button>
        </div>
    </div>

}