
import { css, Global } from '@emotion/react';
import React from 'react';

export enum Color {
    Text = 'var(--color-text)',
    TextVariant = 'var(--color-text-variant)',
    Background = 'var(--color-background)',
    Yellow = 'var(--color-yellow)',
    Red = 'var(--color-red)',
    Blue = 'var(--color-blue)',
}

export const Theme: React.FunctionComponent<{ children?: React.ReactNode }> = props => {
    return (
        <>
            <Global styles={css`
                :root {
                    --color-text: #FFFFFF;
                    --color-text-variant: #333333;
                    --color-background: #000000;
                    --color-yellow: #FFE661;
                    --color-blue: #339DFF;
                    --color-red: #FF4F79;

                    @media (prefers-color-scheme: dark) {
                    }
                }
            `} />
            {props.children}
        </>
    )
}
