import { FunctionComponent } from "react";

interface SelectProps {
    label: string;
    options: string[];
}

export const Select: FunctionComponent<SelectProps> = props => {
    return (
        <div>Filter: {props.label}</div>
    )
}
