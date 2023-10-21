
import { css, Global } from '@emotion/react';
import React from 'react';

export enum Color {
    Text = 'var(--color-text)',
    TextVariant = 'var(--color-text-variant)',
    Background = 'var(--color-background)',

    Yellow = 'var(--color-yellow)',
    YellowVariant = 'var(--color-yellow-variant)',
    Red = 'var(--color-red)',
    RedVariant = 'var(--color-red-variant)',
    Blue = 'var(--color-blue)',
    BlueVariant = 'var(--color-blue-variant)',
}

export const Theme: React.FunctionComponent<{ children?: React.ReactNode }> = props => {
    return (
        <>
            <Global styles={css`
                :root {
                    --color-text: #000000;
                    --color-text-variant: #333333;
                    --color-background: #FFFFFF;
                    --color-yellow: #FFE661;
                    --color-yellow-variant: #DFC123;
                    --color-blue: #339DFF;
                    --color-blue-variant: #0579E3;
                    --color-red: #FF4F79;
                    --color-red-variant: #DB1C4A;

                    @media (prefers-color-scheme: dark) {
                    }
                }
            `} />
            {props.children}
        </>
    )
}
