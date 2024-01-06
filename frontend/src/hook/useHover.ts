import { useState, useRef, useCallback } from "react";

export default function useHover() {
    const [hovering, setHovering] = useState<boolean>(false);
    const previousNode = useRef<HTMLElement | null>(null);

    const handleMouseEnter = useCallback(() => setHovering(true), []);
    const handleMouseLeave = useCallback(() => setHovering(false), []);

    const customRef: any = useCallback((node: HTMLElement | null) => {
            if (previousNode.current) {
                previousNode.current.removeEventListener("mouseenter", handleMouseEnter);
                previousNode.current.removeEventListener("mouseleave", handleMouseLeave);
            }
            if (node) {
                node.addEventListener("mouseenter", handleMouseEnter);
                node.addEventListener("mouseleave", handleMouseLeave);
            }
            previousNode.current = node;
        }, [handleMouseEnter, handleMouseLeave]);

    return [customRef, hovering];
}