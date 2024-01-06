import ping from "ping";
import { toJson, restime } from "#utils/utils.js";

const handlePing = (props) => {
    const { ws, data } = props;
    const { ip, retry, interval } = data;
    let retrys = 0;
 
    if (ws.readyState !== 1) {
        return;
    }
    const start = performance.now();

    const handlesendPing = () => {
        ip?.forEach(async (ipaddr, idx) => {
            const startping = performance.now();
            const result = await ping.promise.probe(ipaddr);
            ws.send(toJson({
                    type: "message",
                    data: {
                        id: idx,
                        ip: result.numeric_host || ipaddr,
                        alive: result.alive && result.alive,
                        time: result.time && result.time,
                        times: restime(startping),
                        host: result.host && result.host,
                        retrys: retrys,
                    },
                })
            );
        });
    };
    
    const int = setInterval(() => {
        if (ws.readyState !== 1) {
            return;
        }
        if (retrys >= retry) {
            clearInterval(int);
            console.log({ status: "finished", time: restime(start) });
        } else {
            handlesendPing();
            retrys += 1;
        }
    }, interval);

    ws.on("close", () =>  clearInterval(int));
    return () => clearInterval(int);
};

export default handlePing;
