
import { css, Global } from '@emotion/react';
import React from 'react';

export enum Color {
    Text = 'var(--color-text)',
    Text20 = 'var(--color-text20)',
    Text50 = 'var(--color-text50)',
    Background = 'var(--color-background)',
    Background80 = 'var(--color-background80)',

    Yellow = 'var(--color-yellow)',
    Green = 'var(--color-green)',
    Blue = 'var(--color-blue)',
    Red = 'var(--color-red)',
}

export const Theme: React.FunctionComponent<{ children?: React.ReactNode }> = props => {
    return (
        <>
            <Global styles={css`
                :root {
                    --color-text: #000000;
                    --color-text50: #00000080;
                    --color-text20: #00000033;
                    --color-background: #FFFFFF;
                    --color-background80: #FFFFFFCC;
                    --color-yellow: #FFBC42;
                    --color-green: #108A5F;
                    --color-blue: #0496FF;
                    --color-red: #EF5F5F;

                    @media (prefers-color-scheme: dark) {
                        --color-text: #FFFFFF;
                        --color-text50: #FFFFFF80;
                        --color-text20: #FFFFFF33;
                        --color-background: #000000;
                        --color-background80: #000000CC;
                    }
                }
            `} />
            {props.children}
        </>
    )
}
