import React from "react";
import { Loading } from "#components";

const ListAll = (props) => {
    const { dataArr =[] } = props;
    if (dataArr.length === 0) {
        return <Loading />;
    }

    const classBr = "border-b border-gray-400 w-full";

    return (
        <table className="table-fixed">
            <thead>
                {dataArr && (
                    <tr className="flex">
                        <th className={classBr}>No</th>
                            {Object.keys(dataArr[0]).filter((key) => key !== "_id")
                            .map((key, index) => (
                                <th key={index} className={classBr}>
                                    {key}
                                </th>
                            ))}
                    </tr>
                )}
            </thead>
            <tbody >
                {dataArr && (
                        dataArr.map((msg, idx) => (
                            <tr className="flex text-sm" key={idx}>
                                <td className={"w-full border-gray-400"}> {idx + 1}</td>
                            {Object.keys(msg).filter((key) => key !== "_id")
                            .map((key, index) => (
                                <td key={index} className={"flex justify-start px-1 items-center w-full text-nowrap overflow-hidden border-b border-stone-500/20"}>
                                    {typeof msg[key] === "boolean"
                                        ? msg[key] ? "true" : "false" : msg[key]}
                                </td>
                            ))}
                        </tr>
                        ))
                )}
            </tbody>
        </table>
    );
};


export default ListAll;
