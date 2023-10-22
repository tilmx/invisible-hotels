import { useRef, useEffect, FunctionComponent, ReactNode } from "react";

export const OutsideClick: FunctionComponent<{ children?: ReactNode; onOutsideClick: () => void }> = props => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!wrapperRef.current?.contains(event.target as Node)) {
                props.onOutsideClick();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <div ref={wrapperRef}>{props.children}</div>
    )
}
