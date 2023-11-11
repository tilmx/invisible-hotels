import styled from '@emotion/styled'
import { FunctionComponent, ReactNode } from 'react';
import { Text, TextSize } from './text';
import { Check, HelpCircle, X } from 'lucide-react';
import { Size } from './tokens/size';
import { Breakpoint } from './tokens/breakpoint';
import { AlignItems, Flex, JustifyContent } from './utils/flex';

interface TableProps {
    backgroundColor?: string;
    data: {
        label: string;
        value?: string | number | boolean;
        content?: ReactNode;
    }[]
}

const StyledContainer = styled.div`
    max-width: 560px;
    margin: 0 auto;
`;

const StyledRow = styled.div`
    padding: ${Size.L} 0 0;
    border-bottom: 2px solid transparent;
    position: relative;

    :after {
        content: '';
        display: block;
        height: 2px;
        margin-top: ${Size.L};
        width: 100%;
        background: currentColor;
        opacity: .1;
        border-radius: 1px;
    }

    ${Breakpoint.Mobile} {
        padding: ${Size.M} 0;
    }

    :last-of-type {
        border: none;

        :after {
            display: none;
        }
    }
`;

const StyledIconWrapper = styled.div<{ greyedOut?: boolean }>`
    padding: ${Size.XXS};
    position: relative;

    :after {
        content: '';
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: currentColor;
        border-radius: 50%;
        ${props => props.greyedOut && 'opacity: .1;'}
    }
    
    svg {
        position: relative;
        z-index: 1;
        display: block;
        stroke-width: 3;
        ${props => props.greyedOut && 'opacity: .3;'}
    }

    ${Breakpoint.Mobile} {
        svg {
            height: 20px;
            width: 20px;
        }
    }
`;

export const Table: FunctionComponent<TableProps> = props => {
    return (
        <StyledContainer>
            {props.data.map((row, i) =>
                <StyledRow key={i}>
                    <Flex justifyContent={JustifyContent.SpaceBetween} alignItems={AlignItems.Center}>
                        <Text size={TextSize.SuperLarge} serif>{row.label}</Text>
                        {typeof row.value === 'string' || typeof row.value === 'number' &&
                            <Text size={TextSize.Large}>{row.value}</Text>
                        }
                        {typeof row.value === 'boolean' &&
                            <StyledIconWrapper greyedOut={!row.value}>
                                {row.value ? <Check color={props.backgroundColor} /> : <X />}
                            </StyledIconWrapper>
                        }
                        {typeof row.value === 'undefined' &&
                            <StyledIconWrapper greyedOut>
                                <HelpCircle />
                            </StyledIconWrapper>
                        }
                    </Flex>
                    {row.content}
                </StyledRow>
            )}
        </StyledContainer>
    )
}
