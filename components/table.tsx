import styled from '@emotion/styled'
import { FunctionComponent } from 'react';
import { Text, TextSize } from './text';
import { Breakpoint, Size } from './tokens';
import { Check, HelpCircle, X } from 'lucide-react';

interface TableProps {
    backgroundColor?: string;
    data: {
        label: string;
        value?: string | number | boolean;
    }[]
}

const StyledContainer = styled.div`
    max-width: 560px;
    margin: 0 auto;
`;

const StyledRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${Size.L} 0;
    border-bottom: 2px solid transparent;
    position: relative;

    :after {
        content: '';
        position: absolute;
        display: block;
        left: 0;
        bottom: 0;
        height: 2px;
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
`;

export const Table: FunctionComponent<TableProps> = props => {
    return (
        <StyledContainer>
            {props.data.map((row, i) =>
                <StyledRow key={i}>
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
                </StyledRow>
            )}
        </StyledContainer>
    )
}
