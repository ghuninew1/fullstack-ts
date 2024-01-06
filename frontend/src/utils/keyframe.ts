const keyframes = {
    arrowIdle: {
        "0%, 100%": {
            transform: "translateX(0)",
        },
        "50%": {
            transform: "translateX(-10px)",
        },
    },
    zoomOut: {
        "0%": {
            opacity: "1",
        },
        "100%": {
            opacity: "0",
            transform: "scale3d(0.3, 0.3, 0.3)",
        },
    },
    zoomOutUp: {
        "0%": {
            opacity: "1",
        },
        "100%": {
            opacity: "0",
            transform: "scale3d(0.3, 0.3, 0.3) translateY(-2000px)",
        },
    },
    zoomOutDown: {
        "0%": {
            opacity: "1",
        },
        "100%": {
            opacity: "0",
            transform: "scale3d(0.3, 0.3, 0.3) translateY(2000px)",
        },
    },
    zoomOutLeft: {
        "0%": {
            opacity: "1",
        },
        "100%": {
            opacity: "0",
            transform: "scale3d(0.3, 0.3, 0.3) translateX(-2000px)",
        },
    },
    zoomOutRight: {
        "0%": {
            opacity: "1",
        },
        "100%": {
            opacity: "0",
            transform: "scale3d(0.3, 0.3, 0.3) translateX(2000px)",
        },
    },
    zoomIn: {
        "0%": {
            opacity: "0",
            transform: "scale3d(0.3, 0.3, 0.3)",
        },
        "50%": {
            opacity: "1",
        },
    },
    zoomInUp: {
        "0%": {
            opacity: "0",
            transform: "scale3d(0.3, 0.3, 0.3) translateY(2000px)",
        },
        "50%": {
            opacity: "1",
        },
    },
    zoomInDown: {
        "0%": {
            opacity: "0",
            transform: "scale3d(0.3, 0.3, 0.3) translateY(-2000px)",
        },
        "50%": {
            opacity: "1",
        },
    },
    zoomInLeft: {
        "0%": {
            opacity: "0",
            transform: "scale3d(0.3, 0.3, 0.3) translateX(-2000px)",
        },
        "50%": {
            opacity: "1",
        },
    },
    zoomInRight: {
        "0%": {
            opacity: "0",
            transform: "scale3d(0.3, 0.3, 0.3) translateX(2000px)",
        },
        "50%": {
            opacity: "1",
        },
    },
    fadeIn: {
        "0%": {
            opacity: "0",
        },
        "100%": {
            opacity: "1",
        },
    },
    fadeInUp: {
        "0%": {
            opacity: "0",
            transform: "translateY(1000px)",
        },
        "100%": {
            opacity: "1",
            transform: "translateY(0)",
        },
    },
    fadeInDown: {
        "0%": {
            opacity: "0",
            transform: "translateY(-1000px)",
        },
        "100%": {
            opacity: "1",
            transform: "translateY(0)",
        },
    },
    fadeInLeft: {
        "0%": {
            opacity: "0",
            transform: "translateX(-100%)",
        },
        "100%": {
            opacity: "1",
            transform: "translateX(0)",
        },
    },
    fadeInRight: {
        "0%": {
            opacity: "0",
            transform: "translateX(100%)",
        },
        "100%": {
            opacity: "1",
            transform: "translateX(0)",
        },
    },
    fadeOut: {
        "0%": {
            opacity: "1",
        },
        "100%": {
            opacity: "0",
        },
    },
    fadeOutUp: {
        "0%": {
            opacity: "1",
            transform: "translateY(0)",
        },
        "100%": {
            opacity: "0",
            transform: "translateY(-1000px)",
        },
    },
    fadeOutDown: {
        "0%": {
            opacity: "1",
            transform: "translateY(0)",
        },
        "100%": {
            opacity: "0",
            transform: "translateY(100px)",
        },
    },
    fadeOutLeft: {
        "0%": {
            opacity: "1",
            transform: "translateX(0)",
        },
        "100%": {
            opacity: "0",
            transform: "translateX(-1000px)",
        },
    },
    fadeOutRight: {
        "0%": {
            opacity: "1",
            transform: "translateX(0)",
        },
        "100%": {
            opacity: "0",
            transform: "translateX(1000px)",
        },
    },
};

const animations = {
    arrowIdle: "arrowIdle 2s ease infinite",
    zoomOut: "zoomOut 0.7s ease-in-out forwards",
    zoomOutUp: "zoomOutUp 0.7s ease-in-out forwards",
    zoomOutDown: "zoomOutDown 0.7s ease-in-out forwards",
    zoomOutLeft: "zoomOutLeft 0.7s ease-in-out forwards",
    zoomOutRight: "zoomOutRight 0.7s ease-in-out forwards",
    zoomIn: "zoomIn 0.7s ease-in-out forwards",
    zoomInUp: "zoomInUp 0.7s ease-in-out forwards",
    zoomInDown: "zoomInDown 0.7s ease-in-out forwards",
    zoomInLeft: "zoomInLeft 0.7s ease-in-out forwards",
    zoomInRight: "zoomInRight 0.7s ease-in-out forwards",
    fadeIn: "fadeIn 0.7s ease-in-out forwards",
    fadeInUp: "fadeInUp 0.7s ease-in-out forwards",
    fadeInDown: "fadeInDown 0.7s ease-in-out forwards",
    fadeInLeft: "fadeInLeft 0.7s ease-in-out forwards",
    fadeInRight: "fadeInRight 0.7s ease-in-out forwards",
    fadeOut: "fadeOut 0.7s ease-in-out forwards",
    fadeOutUp: "fadeOutUp 0.7s ease-in-out forwards",
    fadeOutDown: "fadeOutDown 0.7s ease-in-out forwards",
    fadeOutLeft: "fadeOutLeft 0.7s ease-in-out forwards",
    fadeOutRight: "fadeOutRight 0.7s ease-in-out forwards",
};

export { keyframes, animations };
