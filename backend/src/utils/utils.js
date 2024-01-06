export const clx = (...classNames) => classNames.filter(Boolean).join(" ");

function stringify(e) {
    let result = "";
    if (typeof e === "string" || typeof e === "number") {
        result += e;
    } else if (typeof e === "object") {
        if (Array.isArray(e)) {
            for (let i = 0; i < e.length; i++) {
                if (e[i]) {
                    let nestedString = stringify(e[i]);
                    if (result) {
                        result += " ";
                    }
                    result += nestedString;
                }
            }
        } else {
            for (let key in e) {
                if (e[key]) {
                    if (result) {
                        result += " ";
                    }
                    result += key;
                }
            }
        }
    }
    return result;
}

export function cx(...args) {
    return args.filter(arg => arg !== null && arg !== undefined).map(stringify).join(" ");
}

export const noop = () => {};
export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const waitFn = (ms, fn) =>
    new Promise((resolve) => setTimeout(() => resolve(fn()), ms));

export const waitUntil = (fn) =>
    new Promise((resolve) => {
        const id = setInterval(() => {
            if (fn()) {
                clearInterval(id);
                resolve();
            }
        }, 1000);
    });

export const delay = (s = 1000, fn) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(fn());
        }, s);
    });

export const interval = (s = 1000, fn) => {
    const id = setInterval(() => {
        fn();
    }, s);
    return () => clearInterval(id);
};

export const debounce = (fn, ms = 1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(...args);
        }, ms);
    };
};

export const online = () => navigator.onLine;
export const show = (isshow=false,fn) => isshow ? new Promise(fn) : null

export const isObj = (obj) =>
    obj !== null && typeof obj === "object" && !Array.isArray(obj);

export const isArr = (arr) => Array.isArray(arr) && arr.length > 0;
export const toJson = (obj) => JSON.stringify(obj, null, 2);
export const toObj = (json) => JSON.parse(json);
export const toArr = (obj) => Object.values(obj);
export const isFn = (fn) => typeof fn === "function";
export const isNull = (obj) => obj == null || obj === "";

export const toMap = (arr, key) =>
    arr.reduce((acc, item) => {
        acc[item[key]] = item;
        return acc;
    }, {});

export const toSet = (arr) => new Set(arr);
export const toStr = (obj) => obj.toString();
export const toNum = (str) => Number(str);
export const toInt = (str) => parseInt(str);
export const toFloat = (str) => parseFloat(str);
export const toBool = (str) => Boolean(str);
export const toLower = (str) => str.toLowerCase();
export const toUpper = (str) => str.toUpperCase();

export const numFormat = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 1,
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
});

export const toNumber = (num) => num && numFormat.format(num);
export const toPercent = (num) => num && numFormat.format(num * 100);

const timeFormat = (time) => time && new Date(time).toLocaleTimeString("th-TH");
const dateFormat = (date) => date && new Date(date).toLocaleDateString("th-TH");
export const toTime = (date) => date && timeFormat(date);
export const toDate = (date) => date && dateFormat(date);
export const toDateTime = (date) =>
    date && `${dateFormat(date)} ${timeFormat(date)}`;

export function restime(previous) {
    const now = performance.now();
    const seconds = Math.floor(now);
    const nanoseconds = Math.floor((now % 1) * 1e9);
    if (previous) {
        const timeRes = seconds - previous;
        return toNumber(timeRes);
    }
    return [seconds, nanoseconds];
}

export const resFn = async (fn, ...args) => {
    const start = performance.now();
    try {
        if (typeof fn === "function") {
            await fn(...args);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
    const end = performance.now();
    const time = toNumber(end - start);
    return time;
};
