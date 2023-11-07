import { FunctionComponent, MouseEventHandler, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Color } from "./tokens/colors";
import { Size } from "./tokens/size";
import { XIcon } from "lucide-react";
import { Text, TextSize } from "./text";
import { Breakpoint } from "./tokens/breakpoint";
import debounce from "lodash.debounce";

const StyledSearchInput = styled.input`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: unset;
    display: block;
    padding: 0 ${Size.L};
    box-sizing: border-box;
    margin: 0;
    font-family: unset;
    font-size: unset;
    color: unset;
    border-radius: ${Size.XL};
    outline: none;
    border: none;

    ${Breakpoint.Tablet} {
        border-radius: calc(${Size.M} + ${Size.XXS});
    }

    ${Breakpoint.Mobile} {
        border-radius: ${Size.M};
    }

    ::placeholder {
        color: ${Color.Text20};
    }

    :focus {
        outline: 2px solid ${Color.Blue};
        box-shadow: 0 0 0 6px ${Color.Blue}33;
    }
`;

const StyledSearchCloseButton = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 ${Size.M};

    svg {
        background: ${Color.Text10};
        padding: ${Size.XXS};
        border-radius: 50%;
        height: 20px;
        width: 20px;
        cursor: pointer;
    }

    @media (hover: hover) {
        svg:hover {
            background: ${Color.Text20};
        }
    }
`;

export const Search: FunctionComponent<{ onChange: (value: string) => void; onCloseClick?: MouseEventHandler; className?: string; }> = props => {
    const search = debounce(query => props.onChange(query), 250);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [])

    return (
        <Text size={TextSize.Large} className={props.className}>
            <StyledSearchInput ref={inputRef} placeholder="Search" onChange={e => search(e.target.value)} />
            <StyledSearchCloseButton onClick={props.onCloseClick}>
                <XIcon />
            </StyledSearchCloseButton>
        </Text>
    )
}
