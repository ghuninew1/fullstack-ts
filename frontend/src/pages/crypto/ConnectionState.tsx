export default function ConnectionState({ isConnected: isConnected }: { isConnected: boolean }) {
    return <p>{isConnected ? "Connected" : "Disconnected"}</p>;
}
