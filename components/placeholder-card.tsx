import styled from '@emotion/styled';
import { FunctionComponent, ReactNode } from 'react';
import { Color } from './tokens/colors';
import { Breakpoint } from './tokens/breakpoint';
import { Text, TextSize } from './text';
import { UnstyledLink } from './utils/link';
import { Button } from './button';
import { SendIcon } from 'lucide-react';

interface PlaceholderCardProps {
    children?: ReactNode;
    className?: string;
    emptyState: boolean;
}

const StyledCard = styled.div<{ emptyState: boolean }>`
    border-radius: var(--size-m);
    padding: var(--size-l);
    display: flex;
    flex-direction: column;
    gap: var(--size-m);
    box-shadow: inset 0 0 0 2px ${Color.Text10};
    color: ${Color.Text60};
    justify-content: center;
    align-items: center;

    ${props => props.emptyState && `
        max-width: 400px;
        place-self: center;
        grid-column: 1/4;
    `}

    ${Breakpoint.Mobile} {
        padding: var(--size-m);
        border-radius: var(--size-s);
    }
`;

export const PlaceholderCard: FunctionComponent<PlaceholderCardProps> = props => {
    return (
        <StyledCard emptyState={props.emptyState} className={props.className}>
            <Text center size={TextSize.Regular}>{props.emptyState ? "It looks like we haven't been in such a place. Any tips?" : "You have a secret hotel tip for us or some feedback? Let us know!"}</Text>
            <UnstyledLink href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}?subject=${encodeURI('I have a secret hotel tip for you!')}&body=${encodeURI('Hey Annika and Tilman! \n\n I have a super secret hotel tip for you — here it is:')}`}>
                <Button iconLeft={<SendIcon />} small secondary>Send E-Mail</Button>
            </UnstyledLink>
        </StyledCard>
    )
}
