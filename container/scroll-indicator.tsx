import { Size } from '../components/tokens/size';
import { Breakpoint, Color } from '../components';
import styled from '@emotion/styled';
import { ArrowDown } from 'lucide-react';
import { FunctionComponent, MouseEventHandler, useEffect, useState } from 'react';

const StyledIndicator = styled.div<{ visible: boolean; }>`
    position: fixed;
    left: 50%;
    bottom: ${Size.XL};
    z-index: 15;
    height: ${Size.XL};
    width: ${Size.XL};
    border-radius: 50%;
    background: ${Color.Yellow};
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform .2s, opacity .2s;
    transform: translateX(-50%);
    box-shadow: 0 0 ${Size.XXL} ${Color.Shadow};
    cursor: pointer;

    ${Breakpoint.Mobile} {
        bottom: ${Size.L};
    }

    :active {
        transform: translateX(-50%) scale(1.1);
    }

    @media (hover: hover) {
        :hover {
            transform: translateX(-50%) scale(1.1);
        }
    }

    ${props => !props.visible && `
        transform: translateX(-50%) scale(0);
        opacity: 0;
    `}
`;

export const ScrollIndicator: FunctionComponent<{ onClick?: MouseEventHandler }> = props => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(window.scrollY < 200);
        window.addEventListener('scroll', listenToScroll);
        return () => {
            window.removeEventListener('scroll', listenToScroll);
        }
    })

    const listenToScroll = () => {
        setVisible(window.scrollY < 200);
    }

    return (
        <StyledIndicator onClick={props.onClick} visible={visible}>
            <ArrowDown />
        </StyledIndicator>
    )
}
