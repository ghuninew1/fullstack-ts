import { cx, toTime, isObj } from "#utils/utils";

const EventsCb = ({ events = {} }) => {
    const formatNumber = (num:number) => num && Number(num).toFixed(4);
    const handleEvents = (events: any) => {
        return {
            type: events.type,
            product_id: events.product_id,
            price: formatNumber(events.price),
            open_24h: formatNumber(events.open_24h),
            volume_24h: formatNumber(events.volume_24h),
            low_24h: formatNumber(events.low_24h),
            high_24h: formatNumber(events.high_24h),
            volume_30d: formatNumber(events.volume_30d),
            best_bid: formatNumber(events.best_bid),
            best_ask: formatNumber(events.best_ask),
            side: events.side,
            time: toTime(events.time),
            trade_id: events.trade_id,
            last_size: formatNumber(events.last_size),
        };
    };

    const getTableHeaders = (events: any) => {
        const eventKeys = Object.keys(handleEvents(events));
        return eventKeys.map((value, index) => (
            <th className="border p-2 " key={index}>
                {value}
            </th>
        ));
    };

    const getTableData = (events) => {
        const eventValues = Object.values(handleEvents(events));
        return eventValues.map((value, index) => (
            <td key={index} className="w-2 border p-3">
                {value}
            </td>
        ));
    };

    const classNames = (value) => {
        return cx(
            value?.side === "buy" ? "bg-green-500" : "bg-red-500",
            "text-black text-sm"
        );
    };

    return (
        <table className="table-fixed">
            <thead>
                <tr>
                    {isObj(handleEvents(events)) && getTableHeaders(events)}
                </tr>
            </thead>
            <tbody>
                <tr className={classNames(events)}>
                    {isObj(handleEvents(events)) && getTableData(events)}
                </tr>
            </tbody>
        </table>
    );
};

export default EventsCb;