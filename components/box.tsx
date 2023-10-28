import styled from '@emotion/styled'
import { Text, TextSize } from './text';
import { Breakpoint, Color, Size } from './tokens';
import { FunctionComponent, ReactNode } from 'react';
import { CookieIcon } from 'lucide-react';
import { Link } from './utils';

const StyledMessage = styled.div`
    padding: ${Size.L};
    max-width: 400px;
    margin: 0 auto;
    border-radius: ${Size.M};
    background: ${Color.Background80};
    backdrop-filter: blur(${Size.M});
    box-shadow: 0 ${Size.XS} ${Size.L} ${Color.Shadow}, inset 0 0 0 1px ${Color.Text20};
    display: flex;
    flex-direction: column;
    gap: ${Size.S};

    > svg {
        display: block;
        width: ${Size.L};
        height: ${Size.L};
    }
`;

const StyledButtonList = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-top: ${Size.S};
    gap: ${Size.XXS};

    ${Breakpoint.Mobile} {
        grid-template-columns: 1fr;
    }
`;

export const Box: FunctionComponent<{ title: string; description: string; children?: ReactNode; }> = props => {
	return (
		<StyledMessage>
			<CookieIcon />
			<Text size={TextSize.Large} bold>{props.title}</Text>
			<Text size={TextSize.Regular}>{props.description}</Text>
			<Text size={TextSize.Small} color={Color.Text50}>Find out more in our <Link href="legal/privacy-policy">privacy policy</Link>.</Text>
			<StyledButtonList>
				{props.children}
			</StyledButtonList>
		</StyledMessage>
	)
}
