import { Button } from "#components";
import { cx } from "#utils";
import { useEffect } from "react";
import useSocket from "#hook/useSocket";
import ConnectionState from "./ConnectionState";
import EventsCb from "./EventsCb";

export default function Coinbase() {
    const { connect, disconnect, isConnected, send, lastMessage } = useSocket({
        url: "wss://ws-feed.exchange.coinbase.com",
    });

    useEffect(() => {
        if (isConnected) {
            send({
                type: "subscribe",
                product_ids: ["ETH-USD"],
                channels: ["ticker_batch"],
            });
        }
    }, [isConnected, send]);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className=" mb-10 text-center">
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
                            onClick={() => disconnect()}
                            loading={!isConnected}
                        >
                            Disconnect
                        </Button>
                    ) : (
                        <Button
                            color="bg-green-600"
                            onClick={() => connect()}
                            loading={!isConnected}
                        >
                            Connect
                        </Button>
                    )}
                </div>
            </div>
            <EventsCb events={lastMessage} />
        </div>
    );
}


