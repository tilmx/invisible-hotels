import styled from '@emotion/styled'
import { Text, TextSize } from './text';
import { FunctionComponent, ReactNode } from 'react';
import { MapPinIcon } from 'lucide-react';
import { Link } from './utils/link';
import { Color } from './tokens/colors';
import { Size } from './tokens/size';

const StyledMessage = styled.div`
    padding: ${Size.L};
    max-width: 400px;
    margin: 0 auto;
    border-radius: ${Size.M};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${Size.S};

    > svg {
        display: block;
        width: ${Size.L};
        height: ${Size.L};
    }
`;

export const Box: FunctionComponent<{ title: string; description: string; children?: ReactNode; }> = props => {
    return (
        <StyledMessage>
            <MapPinIcon />
            <Text center size={TextSize.Large} bold>{props.title}</Text>
            <Text center size={TextSize.Regular}>{props.description}</Text>
            <Text center size={TextSize.Small} color={Color.Text50}>Find out more in our <Link href="legal/privacy-policy">privacy policy</Link>.</Text>
            {props.children}
        </StyledMessage>
    )
}
