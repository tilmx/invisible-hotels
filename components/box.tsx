import styled from '@emotion/styled'
import { Text, TextSize } from './text';
import { FunctionComponent, ReactNode } from 'react';
import { MapPinIcon } from 'lucide-react';
import { Link } from './utils/link';

const StyledMessage = styled.div`
    padding: var(--size-l);
    max-width: 400px;
    margin: 0 auto;
    border-radius: var(--size-m);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--size-s);

    > svg {
        display: block;
        width: var(--size-l);
        height: var(--size-l);
    }
`;

export const Box: FunctionComponent<{ title: string; description: string; children?: ReactNode; }> = props => {
    return (
        <StyledMessage>
            <MapPinIcon />
            <Text center size={TextSize.Large} bold>{props.title}</Text>
            <Text center size={TextSize.Regular}>{props.description}</Text>
            <Text center size={TextSize.Small}>Find out more in our <Link href="legal/privacy-policy">privacy policy</Link>.</Text>
            {props.children}
        </StyledMessage>
    )
}
