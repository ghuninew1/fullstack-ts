import { cx, toTime, isObj } from "#utils";

const EventsBi = ({ events = {} }) => {
    const formatNumber = (num:number) => num && Number(num).toFixed(4);
    const handleEvents = (events: any) => {
        const { e, E, s, t, p, q, b, a, T, m, M } = events;
        return {
            type: e,
            eventTime: toTime(E),
            symbol: s,
            tradeId: t,
            price: formatNumber(p),
            quantity: formatNumber(q),
            buyer: b,
            seller: a,
            tradeTime: toTime(T),
            buyMarket: m ? "Buy" : "Sell",
            ignore: String(M),
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

    const getTableData = (events: any) => {
        const eventValues = Object.values(handleEvents(events));
        return eventValues.map((value, index) => (
            <td key={index} className="w-2 border p-3">
                {value}
            </td>
        ));
    };

    const classNames = (value:string |any) => {
        return cx(
            value?.m ? "bg-green-500" : "bg-red-500",
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

export default EventsBi;