import { CSSProperties, FunctionComponent, MouseEventHandler, ReactNode } from "react";
import { Tag } from "./tag";
import { Color } from "./tokens/colors";
import { getVacationTypeColor } from "../utils";
import styles from './filter-item.module.scss'
import clsx from "clsx";

interface FilterProps {
    label?: string;
    icon?: ReactNode;
    selected?: boolean;
    onClick?: MouseEventHandler;
}

export const FilterItem: FunctionComponent<FilterProps> = props => {
    return (
        <Tag
            className={clsx(styles.filterItem, props.selected && styles.selected)}
            icon={props.icon}
            label={props.label}
            onClick={props.onClick}
            style={{ '--color': (getVacationTypeColor(props.label) || Color.Text60) } as CSSProperties}
        />
    )
}
