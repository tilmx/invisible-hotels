import * as React from 'react';
import { Size } from '../components/tokens/size';
import { Breakpoint, Color } from '../components';
import styled from '@emotion/styled';
import { ArrowDown } from 'lucide-react';

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

    ${Breakpoint.Mobile} {
        bottom: ${Size.L};
    }

    &:hover {
        transform: translateX(-50%) scale(1.1);
    }

    ${props => !props.visible && `
        transform: translateX(-50%) scale(0);
        opacity: 0;
    `}
`;

export const ScrollIndicator: React.FunctionComponent = () => {
    const [visible, setVisible] = React.useState(true);

    React.useEffect(() => {
        window.addEventListener('scroll', listenToScroll);
        return () => {
            window.removeEventListener('scroll', listenToScroll);
        }
    })

    const listenToScroll = () => {
        setVisible(window.scrollY < 200)
    }

    return (
        <StyledIndicator visible={visible}>
            <ArrowDown />
        </StyledIndicator>
    )
}
