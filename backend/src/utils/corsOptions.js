const corsOptions = {
    origin: "https://gnew.bigbrain-studio.com:6440",
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

export default corsOptions;
