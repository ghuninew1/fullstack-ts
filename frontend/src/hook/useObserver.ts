import { useState, useRef, useEffect } from "react";

export default function useObserver({
    threshold = 0,
    root = null,
    rootMargin = "0px",
}) {
    const [entry, setEntry] = useState(false);
    const nodeRef = useRef(null);

    useEffect(() => {
        const observerOptions = { threshold, root, rootMargin };
        if (nodeRef.current) {
            const intersectionCallback = ([entry]: any) => {
                setEntry(entry.isIntersecting);
            };
            const observer: any = new IntersectionObserver(
                intersectionCallback,
                observerOptions
            );
            observer.observe(nodeRef.current);
            return () => observer.disconnect();
        }
        return () => {};
    }, [threshold, root, rootMargin]);

    return [nodeRef, entry];
}
