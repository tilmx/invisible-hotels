import { FunctionComponent, MouseEventHandler, useEffect, useRef } from "react";
import { XIcon } from "lucide-react";
import { Text } from "./text";
import debounce from "lodash.debounce";
import styles from "./search.module.scss";

export const Search: FunctionComponent<{ onChange: (value: string) => void; onCloseClick?: MouseEventHandler; className?: string; }> = props => {
    const search = debounce(query => props.onChange(query), 250);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [])

    return (
        <Text size="large" className={props.className}>
            <input className={styles.input} ref={inputRef} placeholder="Search" onChange={e => search(e.target.value)} />
            <div className={styles.close} onClick={props.onCloseClick}>
                <XIcon />
            </div>
        </Text>
    )
}
