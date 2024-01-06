import React, { useEffect, useRef, useState } from "react";

type Props = {
    children: React.ReactNode;
    root?: Element | Document | null;
    rootMargin?: string;
    threshold?: number;
};



const Observer = <T extends Props>(props: T) => {
    const { children } = props;
    const observerRef = useRef(null);
    const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

    useEffect(() => {
        const refCurrent = observerRef.current;
        if (!refCurrent) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setEntry(entry);
            },
            {
                root: props.root,
                rootMargin: props.rootMargin,
                threshold: props.threshold,
            }
        );

        observer.observe(refCurrent);
        return () => {
            if (refCurrent) {
                observer.unobserve(refCurrent);
            }
        };
    }, [props]);

    return <div ref={observerRef}>{entry?.isIntersecting && children}</div>;
};

export default Observer;