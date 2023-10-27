import styled from '@emotion/styled';
import { FunctionComponent, ReactNode } from 'react';
import { Color } from './tokens/colors'
import { Size } from './tokens/size'
import { Breakpoint } from './tokens/breakpoint'
import { Cookie } from 'lucide-react';
import { Text, TextSize } from './text';
import { OutsideClick } from './utils';
import { Wrapper } from './wrapper';

interface OverlayProps {
    headline: string;
    description: string;
    children: ReactNode;
    onOutsideClick: () => void;
}

const StyledContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 50;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${Color.Shadow};
`;

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

export const Overlay: FunctionComponent<OverlayProps> = props => {
    return (
        <StyledContainer>
            <Wrapper>
                <OutsideClick onOutsideClick={props.onOutsideClick}>
                    <StyledMessage>
                        <Cookie />
                        <Text size={TextSize.Large} bold>{props.headline}</Text>
                        <Text size={TextSize.Regular}>{props.description}</Text>
                        <StyledButtonList>
                            {props.children}
                        </StyledButtonList>
                    </StyledMessage>
                </OutsideClick>
            </Wrapper>
        </StyledContainer>
    )
}
