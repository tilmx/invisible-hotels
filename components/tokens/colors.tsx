
import { css, Global } from '@emotion/react';
import { FunctionComponent, ReactNode } from 'react';

export enum Color {
    Text = 'var(--color-text)',
    Text10 = 'var(--color-text10)',
    Text20 = 'var(--color-text20)',
    Text50 = 'var(--color-text50)',
    Text80 = 'var(--color-text80)',
    Background = 'var(--color-background)',
    Background80 = 'var(--color-background80)',
    Shadow = 'var(--color-shadow)',

    Yellow = 'var(--color-yellow)',
    Green = 'var(--color-green)',
    Blue = 'var(--color-blue)',
    Red = 'var(--color-red)',
}

export const Theme: FunctionComponent<{ children?: ReactNode }> = props => {
    return (
        <>
            <Global styles={css`
                :root {
                    --color-text: #000000;
                    --color-text10: #0000001A;
                    --color-text20: #00000033;
                    --color-text50: #00000080;
                    --color-text80: #000000CC;
                    --color-background: #FFFFFF;
                    --color-background80: #FFFFFFCC;
                    --color-shadow: #00000033;

                    --color-yellow: #FFBC42;
                    --color-green: #108A5F;
                    --color-blue: #0496FF;
                    --color-red: #EF5F5F;

                    @media (prefers-color-scheme: dark) {
                        --color-text: #FFFFFF;
                        --color-text10: #FFFFFF1A;
                        --color-text20: #FFFFFF33;
                        --color-text50: #FFFFFF80;
                        --color-text80: #FFFFFFCC;
                        --color-background: #000000;
                        --color-background80: #000000CC;
                    }
                }
            `} />
            {props.children}
        </>
    )
}
