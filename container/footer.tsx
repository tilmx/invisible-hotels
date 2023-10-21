import * as React from 'react';
import { Size } from '../components/tokens/size';
import { Breakpoint, Color, ExternalLink, Flex, Text, TextSize, Wrapper } from '../components';
import styled from '@emotion/styled';

const StyledFooter = styled.div`
    padding-top: ${Size.XXXXL};
    padding-bottom: ${Size.XXL};

    ${Breakpoint.Tablet} {
        padding-top: ${Size.XXXL};
    }

    ${Breakpoint.Mobile} {
        padding-top: ${Size.XXL};
    }
`;

export const Footer: React.FunctionComponent = () => {
    return (
        <StyledFooter>
            <Wrapper>
                <Flex gap={Size.XS}>
                    <ExternalLink link='https://tilman.io/legal/sites-notice'>
                        <Text size={TextSize.Small}>Site's notice</Text>
                    </ExternalLink>
                    <ExternalLink link='https://tilman.io/legal/privacy-policy'>
                        <Text size={TextSize.Small}>Privacy Policy</Text>
                    </ExternalLink>
                </Flex>
            </Wrapper>
        </StyledFooter>
    )
}
