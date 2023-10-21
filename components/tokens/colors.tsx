
import { css, Global } from '@emotion/react';
import React from 'react';

export enum Color {
    Text = 'var(--color-text)',
    TextVariant = 'var(--color-text-variant)',
    Background = 'var(--color-background)',

    Yellow = 'var(--color-yellow)',
    Green = 'var(--color-green)',
    Blue = 'var(--color-blue)',
}

export const Theme: React.FunctionComponent<{ children?: React.ReactNode }> = props => {
    return (
        <>
            <Global styles={css`
                :root {
                    --color-text: #000000;
                    --color-text-variant: #999999;
                    --color-background: #FFFFFF;
                    --color-yellow: #FFBC42;
                    --color-blue: #0496FF;
                    --color-green: #108A5F;

                    @media (prefers-color-scheme: dark) {
                    }
                }
            `} />
            {props.children}
        </>
    )
}
