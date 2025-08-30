import { useEffect } from "react";

export const useOnClickOutside = (ref: React.RefObject<HTMLElement | null>, handler: (event: MouseEvent | TouchEvent) => void) => {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent | TouchEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            handler(event);
        }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};
