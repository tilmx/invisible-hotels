import * as React from 'react';
import { Size } from '../components/tokens/size';
import { Space } from '../components/utils/space';
import { InternalLink, Wrapper } from '../components';

export const Footer: React.FunctionComponent = () => {
    return (
        <Wrapper>
            <Space vertical={Size.XXL} />
            <InternalLink link="/legal/sites-notice">Site's Notice</InternalLink>
            <Space vertical={Size.XXL} />
        </Wrapper>
    )
}
