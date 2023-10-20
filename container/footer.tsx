import * as React from 'react';
import { Size } from '../components/tokens/size';
import { Space } from '../components/utils/space';
import { Wrapper } from '../components';

export const Footer: React.FunctionComponent = () => {
    return (
        <Wrapper>
            <Space vertical={Size.XXL} />
            Footer
            <Space vertical={Size.XXL} />
        </Wrapper>
    )
}
