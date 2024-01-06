import { toJson, toObj, restime } from "#utils/utils.js";
import { v4 as uuidv4 } from "uuid";
import handlePing from "./handlePing.js";

const users = new Map();
const connects = new Map();

export function handleConnection(socket, req) {
  const id = uuidv4();
  socket.isAlive = true;
  socket.on("pong", () => socket.isAlive = true);

  const ip = req.socket.remoteAddress && req.socket.remoteAddress.replace("::ffff:", "");
  const user = req.url === "/ws?user=" ? req.url.split("?")[1].split("=")[1] : req.url === "/ws" && "anonymous";
  
  connects.set(id, socket);
  users.set(id, { id, ip, user });
  
  function broadcast(data) {
    connects.forEach((ws) => {
        ws.send(toJson({ ...data, time: Date.now() }));
    });
  }

  function sendData(data) {
      socket.send(toJson({ ...data, time: Date.now()}));
  }

  const onMessage = (message) => {
    if (socket.readyState !== 1) {
      return;
    }
    try {
      const data = toObj(message);
      switch (data.type) {
        case "ping":
          sendData({ type: "pong" });

          break;
        case "message":
          broadcast(data);

          break;
        case "users":
          sendData({
            type: "users",
            data: [...users.values()],
          });
          break;
        case "handleping":
          const datas = {
            ws: socket,
            data: data.data,
          };
          handlePing(datas);
          break;
        case "handleexternal":
          const url = data.url;
          const method = data.method;
          const config = data.config;
          useFetch({ url, method, config });
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("onMessage error", error?.message);
    }
  };

  const int = setInterval(() => {
    if (users.size === 0) {
      clearInterval(int);
      return;
    }
    connects.forEach((ws) => {
      if (ws.isAlive === false) {
        clearInterval(int);
        return ws.terminate();
      }
      ws.isAlive = false;
      ws.ping();
    });
  }, 30000);

  const onClose = () => {
    connects.delete(users.get(id).id);
    users.delete(users.get(id).id);
    socket.close();
    socket.removeAllListeners();
    clearInterval(int);
    return console.log({ connects: connects.size,status: "disconnect" });
  };

  socket.on("message", onMessage);
  socket.on("close", onClose);
  console.log({ connects: connects.size, user: users.get(id).user, ip: users.get(id).ip });

  return socket;
}
