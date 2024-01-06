import { Button } from "#components";
import useSocket from "#hook/useSocket";
import { cx } from "#utils";
import { useState } from "react";
import EventsBi from "./EventsBi";
import ConnectionState from "./ConnectionState";


export default function Binance() {
    const [symbol, setSymbol] = useState("");
    const { connect, disconnect, isConnected, lastMessage } = useSocket({
        url: `wss://stream.binance.com:9443/ws/${symbol || "ethusdt@trade"}`,
    });

    return (
        <div className="flex w-full flex-col items-center ">
            <div className="my-5 text-center">
                <div
                    className={cx(
                        "flex justify-center text-4xl font-bold p-2 rounded-md uppercase mb-5",
                        isConnected ? "text-green-500" : "text-red-500"
                    )}
                >
                    <ConnectionState isConnected={isConnected} />
                </div>

                <div className="flex flex-col gap-3">
                    {isConnected ? (
                        <Button
                            color="bg-red-500"
                            onClick={disconnect}
                            loading={!isConnected}
                        >
                            Disconnect
                        </Button>
                    ) : (
                        <Button
                            color="bg-green-600"
                            onClick={connect}
                            loading={!isConnected}
                        >
                            Connect
                        </Button>
                    )}
                </div>
            </div>
            <EventsBi events={lastMessage} />
        </div>
    );
}
