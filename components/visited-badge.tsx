import styled from '@emotion/styled'
import { FunctionComponent } from 'react';
import { Breakpoint } from './tokens/breakpoint';

const StyledContainer = styled.div<{ small?: boolean; superSmall?: boolean; }>`
    display: inline-block;
    position: relative;
    width: calc(var(--size-xxxl) * 2);
    height: calc(var(--size-xxxl) * 2);

    img {
        width: 100%;
        height: 100%;
        animation: rotateBadge 30s infinite linear;

        @keyframes rotateBadge {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }

    ${props => props.small && `
        width: calc(var(--size-xxl) * 2);
        height: calc(var(--size-xxl) * 2);
    `}

    ${props => !props.superSmall && `
        ${Breakpoint.TabletSmall} {
            width: calc(var(--size-xxl) * 2);
            height: calc(var(--size-xxl) * 2);
        }
        
        ${Breakpoint.Mobile} {
            width: var(--size-xxxl);
            height: var(--size-xxxl);
        }
    `}

    ${props => props.superSmall && `
        width: var(--size-xxl);
        height: var(--size-xxl);

        ${Breakpoint.Mobile} {
            width: calc(var(--size-xl) + var(--size-xs));
            height: calc(var(--size-xl) + var(--size-xs));
        }
    `}
`;

const StyledEmoji = styled.div<{ superSmall?: boolean; }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 72px;

    ${Breakpoint.Mobile} {
        font-size: 44px;
    }

    ${props => props.superSmall && `
        font-size: 20px;

        ${Breakpoint.Mobile} {
            font-size: 16px;
        }
    `}
`;

export const VisitedBadge: FunctionComponent<{ small?: boolean; superSmall?: boolean; className?: string; }> = props => {
    return (
        <StyledContainer small={props.small} superSmall={props.superSmall} className={props.className}>
            <StyledEmoji superSmall={props.superSmall}>✌️</StyledEmoji>
            {props.superSmall ?
                <img src="/images/visited-badge-small.svg" width={72} height={72} alt="We stayed here" />
                :
                <img src="/images/visited-badge-large.svg" width={200} height={200} alt="We stayed here" />
            }
        </StyledContainer>
    )
}
