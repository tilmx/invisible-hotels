import styled from '@emotion/styled';
import { Breakpoint } from './tokens/breakpoint';
import { DM_Sans, EB_Garamond } from "next/font/google"
import { CSSProperties, FunctionComponent, MouseEventHandler, ReactNode } from 'react';

interface TextProps {
    size?: TextSize;
    color?: string;
    center?: boolean;
    children?: ReactNode;
    style?: CSSProperties;
    serif?: boolean;
    bold?: boolean;
    className?: string;
    onClick?: MouseEventHandler;
}

export enum TextSize {
    Regular,
    Huge,
    ExtraLarge,
    SuperLarge,
    Large,
    Small,
    Unset
}

const FontSerif = EB_Garamond({ weight: '400', style: ['normal', 'italic'], subsets: ['latin'] })
const FontSans = DM_Sans({ weight: ['600', '400'], subsets: ['latin'] })

const StyledText = styled.div<TextProps>`
    ${props => props.serif ? FontSerif.style : FontSans.style}
    line-height: 1.4;
    ${props => props.center && 'text-align: center;'}
    color: ${props => props.color};
    margin: 0;

    ${props => props.size === TextSize.Huge && `
        font-size: 96px;
        line-height: 1;
        letter-spacing: -.03em;

        ${Breakpoint.Tablet} {
            font-size: 72px;
        }

        ${Breakpoint.Mobile} {
            font-size: 48px;
        }

        ${Breakpoint.MobileSmall} {
            font-size: 40px;
        }
    `}

    ${props => props.size === TextSize.ExtraLarge && `
        font-size: 64px;
        line-height: 1.1;
        letter-spacing: -.02em;

        ${Breakpoint.Tablet} {
            font-size: 48px;
        }

        ${Breakpoint.Mobile} {
            font-size: 36px;
        }
    `}

    ${props => props.size === TextSize.SuperLarge && `
        font-size: 44px;
        line-height: 1;
        letter-spacing: -.02em;

        ${Breakpoint.Tablet} {
            font-size: 40px;
        }

        ${Breakpoint.Mobile} {
            font-size: 36px;
        }

        ${Breakpoint.MobileSmall} {
            font-size: 32px;
        }
    `}

    ${props => props.size === TextSize.Large && `
        font-size: 32px;
        line-height: 1;

        ${props.bold && 'letter-spacing: -.02em'};

        ${Breakpoint.Mobile} {
            font-size: 24px;
        }
    `}

    ${props => props.size === TextSize.Regular && `
        font-size: 20px;
        line-height: 24px;

        ${Breakpoint.Mobile} {
            font-size: 17px;
            line-height: 20px;
        }
    `}

    ${props => props.size === TextSize.Small && `
        font-size: 14px;
        line-height: 1;
    `}

    ${props => props.bold && `
        font-weight: 600;
    `}
`;

export const Text: FunctionComponent<TextProps> = props => {
    return (
        <StyledText size={props.size || TextSize.Regular} color={props.color} center={props.center} style={props.style} serif={props.serif} bold={props.bold} className={props.className} onClick={props.onClick}>
            {props.children}
        </StyledText>
    );
};
