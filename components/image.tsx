import NextImage, { StaticImageData } from 'next/image'
import { CSSProperties, FunctionComponent } from 'react';

interface ImageProps {
    image: StaticImageData;
    alt: string;
    sizes?: string;
    style?: CSSProperties
}

export const Image: FunctionComponent<ImageProps> = props => {
    return (
        <NextImage src={props.image} sizes={props.sizes || "100vw"} alt={props.alt} placeholder='blur' style={{ display: 'block', width: '100%', height: 'auto', margin: '0', padding: '0', border: 'none', ...props.style }} />
    )
}
