import { FunctionComponent, ReactNode } from "react";
import Script from 'next/script'

export const TrackingProvider: FunctionComponent<{ children: ReactNode }> = props => {
    const enabled = process.env.NODE_ENV === 'production' &&
        (!process.env.NEXT_PUBLIC_VERCEL_ENV ||
            process.env.NEXT_PUBLIC_VERCEL_ENV === 'production');

    return (
        <>
            {enabled &&
                <Script
                    defer
                    type="text/javascript"
                    security="https://api.pirsch.io/pirsch-extended.js"
                    id="pirschextendedjs"
                    data-code="lTp1KC9kQJ72klGFeYBab8pf59w9VPaW"
                />
            }
            {props.children}
        </>
    )
}