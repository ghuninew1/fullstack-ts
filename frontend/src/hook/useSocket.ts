import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import useEventListener from "./useEventListener";


export default function useSocket({
    url = "wss://gnew.bigbrain-studio.com:6441/ws",
    params = {},
    retry = 10,
    autoConnect = true,
    retryInterval = 1000
}) {
    const socketRef: any = useRef(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [lastMessage, setLastMessage] = useState<any>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [retries, setRetries] = useState<number>(0);

    if (url && Object.keys(params).length) {
        const searchParams = new URLSearchParams(params);
        url = `${url}?${searchParams}`;
    }

    useEffect(() => {
        if (!open || socketRef?.current) {
            return
        }
        const socketCurrent = new WebSocket(url);

        const onOpen = () => {
            setIsConnected(true);
            console.log({ status: "connect" });
        };

        const onClose = () => {
            socketCurrent.close();
            setIsConnected(false);
            setOpen(false);
            console.log({ status: "disconnect" });
        }

        socketCurrent.addEventListener("open", onOpen);
        socketCurrent.addEventListener("close", onClose);

        const cleanupSocket = () => {
            if (socketCurrent.readyState !== 3) {
                socketCurrent.close();
                setOpen(false);
                console.log({ status: "cleanup" });
            }
            socketCurrent.removeEventListener("open", onOpen);
            socketCurrent.removeEventListener("close", onClose);
        };
        socketRef.current = socketCurrent;

        return () => {
            cleanupSocket();
        }
    }, [open, url]);

    const onMessage = useCallback((event : any) => {
        if (!event.data) {
            return;
        }
        if (typeof event.data === "string") {
            const data = JSON.parse(event.data);
            setLastMessage(data);
        } else if (event.data instanceof Blob) {
            const reader: any = new FileReader();
            reader.addEventListener("loadend", () => {
                const data = JSON.parse(reader.result);
                setLastMessage(data);
            });
            reader.readAsText(event.data);
        } else if (event.data instanceof ArrayBuffer) {
            const data = JSON.parse(event.data);
            setLastMessage(data);
        } else {
            setLastMessage(event.data);
        }
    }, []);
    
    useEventListener("message", onMessage, socketRef.current);
    useEffect(() => {
        if (!autoConnect){
            return
        }
        const id = setInterval(() => {
            if (!open) {
                if (retries >= retry) {
                    clearInterval(id);
                    setOpen(false);
                    setRetries(0);
                } else {
                    setRetries((prv) => prv + 1);
                    console.log({ status: "retries", retries });
                    setOpen(true);
                }
            }
        }, retries === 0 ? retryInterval : retryInterval * retries);

        return () => {
            clearInterval(id);
        }
    }, [autoConnect, open, retries, retry, retryInterval]);

    const connect = useCallback(() => {
        if (socketRef.current?.readyState === 1) return;
        setOpen(true);
    }, []);

    const send = useCallback(({ ...data }) => {
        if (socketRef.current?.readyState !== 1) return;
        socketRef.current.send(JSON.stringify(data));
    }, []);

    const disconnect = useCallback(() => {
        if (socketRef.current?.readyState !== 1) return;
        socketRef.current?.close();
        socketRef.current = null;
    }, []);

    const value = useMemo(() => ({
            socket: socketRef.current,
            isConnected,
            lastMessage,
            connect,
            disconnect,
            send,
        }),[isConnected, lastMessage, connect, disconnect, send]
    );

    return value;
}