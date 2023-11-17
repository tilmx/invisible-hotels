
import { css, Global } from '@emotion/react';
import { FunctionComponent, ReactNode } from 'react';

export enum Color {
    Text = 'var(--color-text)',
    TextAlways = 'var(--color-text-always)',
    Text10 = 'var(--color-text10)',
    Text20 = 'var(--color-text20)',
    Text60 = 'var(--color-text60)',
    Text80 = 'var(--color-text80)',
    Background = 'var(--color-background)',
    BackgroundAlways = 'var(--color-background-always)',
    Background80 = 'var(--color-background80)',
    Shadow = 'var(--color-shadow)',

    Yellow = '#FFBC42',
    Green = '#108A5F',
    Blue = '#0496FF',
    Red = '#EF5F5F',
}

export const Theme: FunctionComponent<{ children?: ReactNode }> = props => {
    return (
        <>
            <Global styles={css`
                :root {
                    --color-text: #000000;
                    --color-text-always: #000000;
                    --color-text10: #0000001A;
                    --color-text20: #00000033;
                    --color-text60: #00000099;
                    --color-text80: #000000CC;
                    --color-background: #FFFFFF;
                    --color-background-always: #FFFFFF;
                    --color-background80: #FFFFFFCC;
                    --color-shadow: #00000033;

                    @media (prefers-color-scheme: dark) {
                        --color-text: #FFFFFF;
                        --color-text10: #FFFFFF1A;
                        --color-text20: #FFFFFF33;
                        --color-text60: #FFFFFF99;
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
