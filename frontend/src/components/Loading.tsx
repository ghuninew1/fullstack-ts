const Loading = () => (
    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center">
        <div
            className="-mt-1.5 inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"
            role="status"
        ></div>
        <span className="text-10 inline-block text-gray-600">Loading...</span>
    </div>
);

export default Loading;
