import styled from '@emotion/styled';
import { FunctionComponent, ReactNode } from 'react';
import { Color } from './tokens/colors'
import { OutsideClick } from './utils/outside-click';
import { Wrapper } from './wrapper';
import { Box } from './box';

interface OverlayProps {
    title: string;
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


export const Overlay: FunctionComponent<OverlayProps> = props => {
    return (
        <StyledContainer>
            <Wrapper>
                <OutsideClick onOutsideClick={props.onOutsideClick}>
                    <Box title={props.title} description={props.description}>
                        {props.children}
                    </Box>
                </OutsideClick>
            </Wrapper>
        </StyledContainer>
    )
}
