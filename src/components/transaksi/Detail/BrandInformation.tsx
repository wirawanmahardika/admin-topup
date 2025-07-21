import { Building2 } from "lucide-react";
import type { transactionType } from "../../../types/transactionType";

type props = {
    transactionData: transactionType;
    formatCurrency: (amount?: number) => string
}

export function BrandInformation({transactionData}: props) {
    return <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
            <h2 className="card-title mb-6">
                <Building2 className="w-5 h-5" />
                Informasi Brand
            </h2>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="avatar">
                        <div className="w-12 h-12 rounded-full bg-base-300">
                            <img
                                src={transactionData.brand?.image || undefined}
                                alt={transactionData.brand?.name}
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold">{transactionData.brand?.name}</h3>
                        <p className="text-base-content/70">Operator: {transactionData.brand?.operator}</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="stat">
                        <div className="stat-title text-xs">Popularitas</div>
                        <div className="stat-value text-lg">{transactionData.brand?.popularity}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}