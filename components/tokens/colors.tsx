
import { css, Global } from '@emotion/react';
import React from 'react';

export enum Color {
    Text = 'var(--color-text)',
    TextVariant = 'var(--color-text-variant)',
    Background = 'var(--color-background)',
}

export const Theme: React.FunctionComponent<{ children?: React.ReactNode }> = props => {
    return (
        <>
            <Global styles={css`
                :root {
                    --color-text: #FFFFFF;
                    --color-text-variant: #333333;
                    --color-background: #000000;

                    @media (prefers-color-scheme: dark) {
                    }
                }
            `} />
            {props.children}
        </>
    )
}
