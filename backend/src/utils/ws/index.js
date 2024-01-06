import { WebSocketServer } from "ws";
import { handleConnection } from "./connect.js";

export default function wsServer(server) {
    const wss = new WebSocketServer({
        server: server,
        noServer: server ? false : true,
        path: "/ws",
        perMessageDeflate: true,
    });

    wss.on("connection", handleConnection);

    return wss;
}
