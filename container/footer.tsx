import * as React from 'react';
import { Size } from '../components/tokens/size';
import { Space } from '../components/utils/space';
import { Color, ExternalLink, Flex, Text, TextSize, Wrapper } from '../components';

export const Footer: React.FunctionComponent = () => {
    return (
        <Wrapper>
            <Space vertical={Size.XXL} />
            <Flex>
                <ExternalLink link='https://tilman.io/legal/sites-notice'>
                    <Text size={TextSize.Small} color={Color.TextVariant}>Site's notice</Text>
                </ExternalLink>
                <Space horizontal={Size.XS} />
                <ExternalLink link='http://tilman.io/legal/privacy-policy'>
                    <Text size={TextSize.Small} color={Color.TextVariant}>Privacy Policy</Text>
                </ExternalLink>
            </Flex>
            <Space vertical={Size.XXL} />
        </Wrapper>
    )
}
