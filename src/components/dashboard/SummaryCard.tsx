export default function SummaryCard({type, value, colorClass}: {type: string,value: string, colorClass: string}) {
    return <div className={`stats shadow ${colorClass}`}>
        <div className="stat">
            <div className="stat-title font-medium text-base">{type}</div>
            <div className="stat-value">{value}</div>
        </div>
    </div>
}