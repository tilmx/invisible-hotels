import { FunctionComponent, MouseEventHandler } from "react";
import { Text } from "./text";
import { ChevronDown, XIcon } from "lucide-react";
import { Tag } from "./tag";
import { getCountryFlag } from "../utils";
import clsx from "clsx";
import styles from "./country-select.module.scss";

interface CountrySelectProps {
    label: string;
    value?: string;
    onClick?: MouseEventHandler;
    className?: string;
    active?: boolean;
    disabled?: boolean;
}

export const CountrySelect: FunctionComponent<CountrySelectProps> = props => {
    return (
        <Tag className={clsx(styles.select, props.disabled && styles.disabled, props.active && styles.active, props.className)} label={props.value ? getCountryFlag(props.value) + ' ' + props.value : props.label} onClick={props.onClick}>
            <ChevronDown size="20px" />
        </Tag>
    )
}

interface CountrySelectFlyoutProps {
    options: string[];
    value?: string;
    label: string;
    open: boolean;
    onSet: (country?: string) => void;
}

export const CountrySelectFlyout: FunctionComponent<CountrySelectFlyoutProps> = props => {
    return (
        <div className={styles.flyout}>
            <div className={clsx(styles.flyoutList, props.open && styles.open)}>
                <CountrySelectOption label={props.label} onClick={() => props.onSet(undefined)} />
                {props.options.map((option, i) =>
                    <CountrySelectOption
                        selected={option === props.value}
                        label={option}
                        key={i}
                        onClick={() => props.onSet(props.value === option ? undefined : option)}
                    />
                )}
            </div>
        </div>
    )
}

const CountrySelectOption: FunctionComponent<{ label: string; selected?: boolean; onClick: MouseEventHandler; }> = props => {
    return (
        <div className={clsx(styles.option, props.selected && styles.selected)} onClick={props.onClick}>
            <Text size="regular">
                {getCountryFlag(props.label)}
            </Text>
            <Text size="regular">
                {props.label}
            </Text>
            {props.selected &&
                <XIcon className={styles.removeIcon} size="16px" />
            }
        </div>
    )
}
