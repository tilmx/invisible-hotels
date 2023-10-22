import { Size } from '../components/tokens/size';
import { Breakpoint, ExternalLink, Flex, JustifyContent, Text, TextSize, Wrapper } from '../components';
import styled from '@emotion/styled';
import { FunctionComponent } from 'react';

const StyledFooter = styled.div`
    padding-top: ${Size.XXXXXL};
    padding-bottom: ${Size.XXL};

    ${Breakpoint.Tablet} {
        padding-top: ${Size.XXXXL};
    }

    ${Breakpoint.Mobile} {
        padding-top: ${Size.XXXL};
        padding-bottom: ${Size.L};
    }
`;

export const Footer: FunctionComponent = () => {
    return (
        <StyledFooter>
            <Wrapper>
                <Flex gap={Size.XS} justifyContent={JustifyContent.Center}>
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
