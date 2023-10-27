import { Size } from './tokens/size';
import styled from '@emotion/styled';
import { FunctionComponent, useState } from 'react';
import { Overlay } from './overlay';
import { Breakpoint } from './tokens';
import { AlignItems, Flex, ExternalLink } from './utils';
import { Button } from './button';
import { Text, TextSize } from './text';
import { Wrapper } from './wrapper';
import { Trash2 } from 'lucide-react';

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

const StyledFooterList = styled(Flex)`
    gap: ${Size.L};
    flex-wrap: wrap;

    ${Breakpoint.Mobile} {
        gap: ${Size.S};
    }
`;

const StyledGithubLink = styled(ExternalLink)`
    margin-left: auto;
    svg {
        height: 24px;
        width: auto;
    }

    ${Breakpoint.Mobile} {
        margin-left: unset;

        svg {
            height: 20px;
        }
    }
`;

export const Footer: FunctionComponent = () => {
    const [showCookieOptOut, setShowCookieOptOut] = useState(false);
    return (
        <StyledFooter>
            {showCookieOptOut &&
                <Overlay
                    headline='Do you want to delete all favorites'
                    description='When opting out from cookies all your favorites are cleared'
                    onOutsideClick={() => setShowCookieOptOut(false)}
                >
                    <Button iconLeft={<Trash2 />} onClick={() => {
                        window.localStorage.clear();
                        setShowCookieOptOut(false);
                        location.reload()
                    }}>Delete all</Button>
                    <Button onClick={() => setShowCookieOptOut(false)}>Keep them</Button>
                </Overlay>
            }
            <Wrapper>
                <StyledFooterList>
                    <ExternalLink link='https://tilman.io/legal/sites-notice'>
                        <Text size={TextSize.Regular}>Site’s notice</Text>
                    </ExternalLink>
                    <ExternalLink link='https://tilman.io/legal/privacy-policy'>
                        <Text size={TextSize.Regular}>Privacy Policy</Text>
                    </ExternalLink>
                    <ExternalLink onClick={() => setShowCookieOptOut(true)}>
                        <Text size={TextSize.Regular}>Cookie Opt-out</Text>
                    </ExternalLink>
                    <StyledGithubLink link='https://github.com/tilmx/invisible-hotels'>
                        <Flex alignItems={AlignItems.Center} gap={Size.XXS}>
                            <svg width="98" height="96" viewBox='0 0 98 96' xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="currentColor" />
                            </svg>
                            <Text size={TextSize.Regular}>Open on Github</Text>
                        </Flex>
                    </StyledGithubLink>
                </StyledFooterList>
            </Wrapper>
        </StyledFooter>
    )
}
