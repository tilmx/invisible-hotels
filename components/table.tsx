import styled from '@emotion/styled'
import { FunctionComponent } from 'react';
import { Text, TextSize } from './text';
import { Breakpoint, Color, Size } from './tokens';
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
    border-bottom: 2px solid ${Color.Text10};

    ${Breakpoint.Mobile} {
        padding: ${Size.M} 0;
    }

    &:last-of-type {
        border: none;
    }
`;

const StyledIconWrapper = styled.div<{ disabled?: boolean }>`
    background: ${props => props.disabled ? Color.Text10 : Color.Text};
    color: ${props => props.disabled ? Color.Text : Color.Background};
    padding: ${Size.XXS};
    border-radius: 50%;
    
    svg {
        display: block;
        stroke-width: 3;
        ${props => props.disabled && 'opacity: .3;'}
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
                        <StyledIconWrapper disabled={!row.value}>
                            {row.value ? <Check color={props.backgroundColor} /> : <X />}
                        </StyledIconWrapper>
                    }
                    {typeof row.value === 'undefined' &&
                        <StyledIconWrapper disabled>
                            <HelpCircle />
                        </StyledIconWrapper>
                    }
                </StyledRow>
            )}
        </StyledContainer>
    )
}
