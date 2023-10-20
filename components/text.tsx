import * as React from 'react';
import styled from '@emotion/styled';
import { Breakpoint } from './tokens/breakpoint';
import { DM_Sans, EB_Garamond } from '@next/font/google'
import { Color } from './tokens';

interface TextProps {
    size?: TextSize;
    color?: string;
    center?: boolean;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    serif?: boolean;
}

export enum TextSize {
    Huge,
    Large,
    Regular,
    Small
}

const FontSerif = EB_Garamond({ weight: '400', style: ['normal', 'italic'], subsets: ['latin'] })
const FontSans = DM_Sans({ weight: '700', subsets: ['latin'] })

const StyledText = styled.div<TextProps>`
    ${props => props.serif ? FontSerif.style : FontSans.style}
    line-height: 1.4;
    ${props => props.center && 'text-align: center;'}
    color: ${props => props.color || Color.Text};
    margin: 0;
	cursor: inherit;

    ${props => props.size === TextSize.Huge && `
        font-size: 192px;
        line-height: 0.875;
        letter-spacing: -.03em;

        ${Breakpoint.Tablet} {
            font-size: 144px;
        }

        ${Breakpoint.Tablet} {
            font-size: 96px;
        }
    `}

    ${props => props.size === TextSize.Large && `
        font-size: 96px;
        line-height: 1;
        letter-spacing: -.02em;

        ${Breakpoint.Tablet} {
            font-size: 72px;
        }

        ${Breakpoint.Tablet} {
            font-size: 48px;
        }
    `}

    ${props => props.size === TextSize.Regular && `
        font-size: 20px;
        text-underline-offset: 5px;
    `}

    ${props => props.size === TextSize.Small && `
        font-size: 14px;
        text-underline-offset: 3px;
    `}
`;

export const Text: React.FunctionComponent<TextProps> = props => {
    return (
        <StyledText size={props.size || TextSize.Regular} {...props}>
            {props.children}
        </StyledText>
    );
};
