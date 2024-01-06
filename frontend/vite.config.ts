import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync} from "node:fs";
// import million from "million/compiler";

const __dirname = path.resolve();

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        // million.vite({ auto: {threshold: 0.05,skip: []}}), 
        react()
    ],
    server: {
        open: "https://gnew.bigbrain-studio.com:6440",
        origin: "https://gnew.bigbrain-studio.com:6440",
        host: true,
        port: 6440,
        https: {
            key: readFileSync(path.resolve(__dirname, "../misc/", "privkey.pem")),
            cert: readFileSync(path.resolve(__dirname, "../misc/", "fullchain.pem")),
        },
    },
    resolve: {
        alias: {
            "#*": path.resolve(__dirname, "./src/*"),
            "#utils": path.resolve(__dirname, "../utils.ts"),
        },
    },
});
