import styled from "@emotion/styled";
import Link from "next/link";
import { FunctionComponent } from "react";
import { Color, Size } from "./tokens";
import { ArrowLeft } from "lucide-react";
import { Text } from "./text";
import { Flex } from "./utils";

const StyledBackButton = styled(Link)`
    color: inherit;
    text-decoration: inherit;
    display: flex;
    gap: ${Size.XXS};
    padding: ${Size.XXS};
    margin: -${Size.XXS};
    border-radius: ${Size.XS};
    @media (hover: hover) {
        :hover {
                background: ${Color.Text10};
            }
        }
    }
`;

export const BackButton: FunctionComponent<{ href: string; label: string; }> = props => {
    return (
        <Flex>
            <StyledBackButton href={props.href}>
                <ArrowLeft />
                <Text>{props.label}</Text>
            </StyledBackButton>
        </Flex>
    )
} 