import * as React from 'react';
import { Text, TextSize } from '../components/text';
import { Size } from '../components/tokens/size';
import { Space } from '../components/utils/space';
import { Color, InternalLink, Wrapper } from '../components';

export const Footer: React.FunctionComponent = () => {
    return (
        <Wrapper>
            <Space vertical={Size.XXL} />
            <Text size={TextSize.SuperSmall} color={Color.TextLight} center sansserif>
                <InternalLink link="/legal/sites-notice">Site's Notice</InternalLink> — <InternalLink link="/legal/privacy-policy">Privacy Policy</InternalLink>
            </Text>
            <Space vertical={Size.XXL} />
        </Wrapper>
    )
}
