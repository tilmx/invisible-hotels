import * as React from 'react';
import { Size } from '../components/tokens/size';
import { Breakpoint, Color, ExternalLink, Flex, Text, TextSize, Wrapper } from '../components';
import styled from '@emotion/styled';

const StyledFooter = styled.div`
    margin-top: ${Size.XXXXL};
    margin-bottom: ${Size.XXL};

    ${Breakpoint.Tablet} {
        margin-top: ${Size.XXXL};
    }

    ${Breakpoint.Mobile} {
        margin-top: ${Size.XXL};
    }
`;

export const Footer: React.FunctionComponent = () => {
    return (
        <StyledFooter>
            <Wrapper>
                <Flex gap={Size.XS}>
                    <ExternalLink link='https://tilman.io/legal/sites-notice'>
                        <Text size={TextSize.Small} color={Color.TextVariant}>Site's notice</Text>
                    </ExternalLink>
                    <ExternalLink link='http://tilman.io/legal/privacy-policy'>
                        <Text size={TextSize.Small} color={Color.TextVariant}>Privacy Policy</Text>
                    </ExternalLink>
                </Flex>
            </Wrapper>
        </StyledFooter>
    )
}
