import { FunctionComponent } from "react";
import { Link } from "./utils/link";
import { Text, TextSize } from "./text";
import { useRouter } from "next/router";
import styles from './menu.module.scss';
import clsx from "clsx";

export const Menu: FunctionComponent<{ flying?: boolean; className?: string; }> = props => {
    return (
        <div className={styles.menu}>
            <div className={clsx(styles.container, props.flying && styles.flying, props.className)}>
                <Link className={styles.dotLink} href="/" description="Back to home page">
                    <svg className={styles.dot} width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                            d="M64 116C92.7188 116 116 92.7188 116 64C116 35.2812 92.7188 12 64 12C35.2812 12 12 35.2812 12 64C12 92.7188 35.2812 116 64 116ZM64 128C99.3462 128 128 99.3462 128 64C128 28.6538 99.3462 0 64 0C28.6538 0 0 28.6538 0 64C0 99.3462 28.6538 128 64 128Z"
                            fill="currentColor" />
                        <path
                            d="M48 92V36C48 33.7909 49.7909 32 52 32H56C58.2091 32 60 33.7909 60 36V54C60 56.2091 61.7909 58 64 58H80C82.2091 58 84 59.7909 84 62V66C84 68.2091 82.2091 70 80 70H64C61.7909 70 60 71.7909 60 74V92C60 94.2091 58.2091 96 56 96H52C49.7909 96 48 94.2091 48 92Z"
                            fill="currentColor" />
                    </svg>
                </Link>
                <MenuItem link="/" label="Hotels" />
                <MenuItem link="/map" label="Map" />
                <MenuItem link="/about" label="About" />
            </div>
        </div>
    )
}

const MenuItem: FunctionComponent<{ label: string; link: string; }> = props => {
    return (
        <Link className={clsx(styles.menuItem, useRouter().pathname === props.link && styles.active)} href={props.link}>
            <Text size={TextSize.Regular}>{props.label}</Text>
        </Link>
    )
}
