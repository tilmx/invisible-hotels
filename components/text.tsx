import * as React from 'react';
import styled from '@emotion/styled';
import { Breakpoint } from './tokens/breakpoint';
import { DM_Sans, EB_Garamond } from "next/font/google"

interface TextProps {
    size?: TextSize;
    color?: string;
    center?: boolean;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    serif?: boolean;
    className?: string;
}

export enum TextSize {
    Huge,
    Large,
    Regular,
    Small,
    SuperSmall
}

const FontSerif = EB_Garamond({ weight: '400', style: ['normal', 'italic'], subsets: ['latin'] })
const FontSans = DM_Sans({ weight: ['600', '400'], subsets: ['latin'] })

const StyledText = styled.div<TextProps>`
    ${props => props.serif ? FontSerif.style : FontSans.style}
    line-height: 1.4;
    ${props => props.center && 'text-align: center;'}
    color: ${props => props.color};
    margin: 0;
	cursor: inherit;

    ${props => props.size === TextSize.Huge && `
        font-size: 96px;
        line-height: 1;
        letter-spacing: -.02em;

        ${Breakpoint.Tablet} {
            font-size: 72px;
        }

        ${Breakpoint.Mobile} {
            font-size: 48px;
        }
    `}

    ${props => props.size === TextSize.Large && `
        font-size: 72px;
        line-height: 1;
        letter-spacing: -.02em;
        font-weight: 600;

        ${Breakpoint.DesktopSmall} {
            font-size: 60px;
        }


        ${Breakpoint.Tablet} {
            font-size: 56px;
        }

        ${Breakpoint.Mobile} {
            font-size: 36px;
        }
    `}

    ${props => props.size === TextSize.Regular && `
        font-size: 36px;
        line-height: 1;

        ${Breakpoint.Mobile} {
            font-size: 24px;
        }
    `}

    ${props => props.size === TextSize.Small && `
        font-size: 20px;
        line-height: 24px;

        ${Breakpoint.Mobile} {
            font-size: 17px;
            line-height: 20px;
        }
    `}

    ${props => props.size === TextSize.SuperSmall && `
        font-size: 12px;
        line-height: 100%;
        font-weight: 600;
    `}
`;

export const Text: React.FunctionComponent<TextProps> = props => {
    return (
        <StyledText size={props.size || TextSize.Regular} {...props}>
            {props.children}
        </StyledText>
    );
};
