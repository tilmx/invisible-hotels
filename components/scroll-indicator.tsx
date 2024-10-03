import styled from '@emotion/styled';
import { ArrowDown } from 'lucide-react';
import { FunctionComponent, MouseEventHandler, useEffect, useState } from 'react';
import { Breakpoint } from './tokens/breakpoint';

const StyledIndicator = styled.div<{ visible: boolean; }>`
    position: fixed;
    left: 50%;
    bottom: var(--size-xl);
    height: var(--size-xl);
    width: var(--size-xl);
    border-radius: 50%;
    background: var(--color-yellow);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform .2s, opacity .2s;
    transform: translateX(-50%);
    box-shadow: 0 0 var(--size-xxl) var(--color-shadow);
    cursor: pointer;

    ${Breakpoint.Mobile} {
        bottom: var(--size-l);
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

export const ScrollIndicator: FunctionComponent<{ onClick: MouseEventHandler }> = props => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(window.scrollY < 200);
        window.addEventListener('scroll', listenToScroll);
        return () => {
            window.removeEventListener('scroll', listenToScroll);
        }
    }, [])

    const listenToScroll = () => {
        setVisible(window.scrollY < 200);
    }

    return (
        <StyledIndicator onClick={props.onClick} visible={visible}>
            <ArrowDown />
        </StyledIndicator>
    )
}
