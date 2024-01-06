import { Button } from "#components";
import { cx } from "#utils";
import { useEffect, useState, useCallback } from "react";
import useSocket from "#hook/useSocket.js";
import FormInput from "./FormInput";
import PingTable from "./PingTable";

export default function Ping() {
    const [lastMsg, setLastMsg] = useState<any>({});
    const [showSend, setShowSend] = useState<any>({});

    const { connect, disconnect, isConnected, send, lastMessage } = useSocket({
        url: "wss://gnew.bigbrain-studio.com:6441/ws",
        autoConnect: true,
    });

    useEffect(() => {
        const { data } = lastMessage as any;
        if (!data?.ip) return;
        const ms = (Number(data.times) - Number(data.time)).toFixed(4)
    
        setLastMsg((prev: any) => ({
            ...prev,
            [data.id]: { ...data, ms },
        }));
        
    }, [lastMessage]);    

    const onSubmit = useCallback((event: any) => {
        event.preventDefault();

        const ips = event.target.ip.value.split(",").map((ip: string) => ip.trim()).filter((ip: string) => ip !== "");
        const data = {
            ip: [...ips],
            retry: event.target.retry.value,
            interval: event.target.interval.value,
        };

        if (!data?.ip?.length || !data?.retry || !data?.interval) return;

        setShowSend({...data});
        send({ type: "handleping",  data: data });
        
    }, [send]);

    return (
        <div className='relative flex w-full flex-col'>
            <div className={cx("flex flex-col justify-center items-center text-4xl uppercase font-bold")} >
                <h1 className={cx(isConnected ? "text-green-500" : "text-red-500" )} >
                    {isConnected ? "Connected" : "Disconnected"}
                    </h1>
                <Button
                    color={cx(isConnected ? "bg-green-500" : "bg-red-500" )}
                    onClick={() => isConnected ? disconnect() : connect()}
                    loading={!isConnected}
                >
                    {isConnected ? "Disconnect" : "Connect"}
                </Button>
            </div>
                { showSend?.retry ? (
                    <p className="py-2 text-center text-xl text-slate-400">
                        retry: {showSend?.retry} / interval: {showSend?.interval} ms
                    </p>
                ) : null}

            <div className='my-3 flex w-full items-center justify-center'>
                <FormInput onSubmit={onSubmit} isProps={{ disabled: !isConnected }} />
            </div>

                {lastMsg.length === 0 ? 
                    <p className="text-center text-sm">No data</p> 
                    :
                    <PingTable dataBody={lastMsg} />
                }
        </div>
    );
}
