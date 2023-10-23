import styled from '@emotion/styled';
import { FunctionComponent, MouseEventHandler, ReactNode } from 'react';
import { setCookieOptIn } from './hotel-list';
import { Breakpoint, Color, OutsideClick, Size, Text, TextSize, Wrapper } from '../components';
import { Cookie } from 'lucide-react';

const StyledContainer = styled.div<{ visible: boolean; }>`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 50;
    display: ${props => props.visible ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    background: ${Color.Text50};
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

    svg {
        display: block;
        width: ${Size.L};
        height: ${Size.L};
    }
`;

const StyledButtonList = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-top: ${Size.S};
    gap: ${Size.S};

    ${Breakpoint.Mobile} {
        grid-template-columns: 1fr;
    }
`;

export const CookieOptIn: FunctionComponent<{ visible: boolean; onAllowClick: () => void; onRejectClick: () => void; }> = props => {
    return (
        <StyledContainer visible={props.visible}>
            <Wrapper>
                <OutsideClick onOutsideClick={() => props.onRejectClick()}>
                    <StyledMessage>
                        <Cookie />
                        <Text size={TextSize.Regular}>Save your favorites locally</Text>
                        <Text size={TextSize.Small}>We will save a little cookie with your favorite hotels in this browser. Fine for you?</Text>
                        <StyledButtonList>
                            <Button onClick={() => {
                                setCookieOptIn();
                                props.onAllowClick();
                            }}>Yes, sure</Button>
                            <Button onClick={props.onRejectClick}>No thanks</Button>
                        </StyledButtonList>
                    </StyledMessage>
                </OutsideClick>
            </Wrapper>
        </StyledContainer>
    )
}

const StyledButton = styled.div`
    background: ${Color.Text};
    color: ${Color.Background};
    padding: ${Size.S};
    border-radius: ${Size.L};
    cursor: pointer;

    :active {
        background: ${Color.Text80};
    }

    @media (hover: hover) {
        :hover {
            background: ${Color.Text80};
        }
    }
`;

const Button: FunctionComponent<{ children?: ReactNode; onClick?: MouseEventHandler; }> = props => {
    return (
        <StyledButton onClick={props.onClick}>
            <Text center size={TextSize.Small}>
                {props.children}
            </Text>
        </StyledButton>
    )
}
