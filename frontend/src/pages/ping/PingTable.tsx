import { isObj } from "#utils/utils";

const PingTable = (props) => {
    const { dataBody = {} } = props;

    const classTd = "border border-gray-400 px-4 py-2";
    const classBr = "border border-gray-400 px-4 py-2 text-nowrap";

    return (
        <table className="table-fixed border-collapse border-spacing-2">
            <thead>
                {isObj(dataBody[0]) && (
                    <tr className="bg-gray-700/50">
                        {Object.keys(dataBody[0]).map((key, index) => (
                            <th key={index} className={classBr}>
                                {key}
                            </th>
                        ))}
                    </tr>
                )}
            </thead>
            <tbody>
                {isObj(dataBody[0]) &&
                    Object.values(dataBody).map((msg, idx) => (
                        <tr key={idx} className="bg-gray-500/50">
                            {Object.keys(msg).map((key, index) => (
                                <td key={index} className={classTd}>
                                    {typeof msg[key] === "boolean"
                                        ? msg[key] ? "true" : "false" : msg[key]}
                                </td>
                            ))}
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};


export default PingTable;
