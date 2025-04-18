import { useEffect, useRef, type RefObject, useCallback } from 'react';

export function useScrollToBottom<T extends HTMLElement>(): [
    RefObject<T | null>,
    RefObject<T | null>,
] {
    const containerRef = useRef<T | null>(null);
    const endRef = useRef<T | null>(null);
    const scrollTimeoutRef = useRef<number | null>(null);

    const scrollToBottom = useCallback(() => {
        if (endRef.current) {
            endRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        const end = endRef.current;

        if (container && end) {
            const debouncedScroll = () => {
                if (scrollTimeoutRef.current) {
                    window.clearTimeout(scrollTimeoutRef.current);
                }
                scrollTimeoutRef.current = window.setTimeout(scrollToBottom, 100);
            };

            const observer = new MutationObserver(debouncedScroll);

            observer.observe(container, {
                childList: true,
                subtree: true,
                attributes: true,
                characterData: true,
            });

            return () => {
                observer.disconnect();
                if (scrollTimeoutRef.current) {
                    window.clearTimeout(scrollTimeoutRef.current);
                }
            };
        }
    }, [scrollToBottom]);

    return [containerRef, endRef];
}
