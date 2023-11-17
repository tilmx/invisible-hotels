import { FunctionComponent, useEffect, useState } from "react";
import { Button } from "./button";
import { Flex, JustifyContent } from "./utils/flex";
import { ShareIcon } from "lucide-react";
import styled from "@emotion/styled";
import { Size } from "./tokens/size";
import { siteDescription, siteTitle } from "../data/site";
import { usePlausible } from 'next-plausible'
import { Text, TextSize } from "./text";
import { Color } from "./tokens/colors";
import { AccentStyle, AccentedText } from "./accented-text";
import { Wrapper } from "./wrapper";

const StyledWrapper = styled(Wrapper)`
    max-width: 480px;
    margin: 0 auto;
    padding-top: ${Size.XXXXL};
    display: flex;
    flex-direction: column;
    gap: ${Size.S};
`;

const StyledFlex = styled(Flex)`
    margin-top: ${Size.M};
`;

export const Share: FunctionComponent = () => {
    const plausible = usePlausible()
    const [shareAvailable, setShareAvailable] = useState(false);

    useEffect(() => {
        if (navigator.share!) {
            setShareAvailable(true)
        }
    }, [])

    function share() {
        if (navigator.share) {
            navigator.share({
                title: siteTitle,
                text: 'Check out our personal list of lovely, minimalistic, and fancy hotels & apartments',
                url: `https://${process.env.NEXT_PUBLIC_DOMAIN}/`,
            }).then(() => {
                plausible('share')
            }).catch((error) => console.log('Something went wrong with sharing: ', error));
        }
    }

    return (
        <StyledWrapper>
            <Text size={TextSize.SuperLarge} center bold>
                <AccentedText color={Color.Text80} accentStyle={AccentStyle.Circled}>
                    {siteTitle}
                </AccentedText>
            </Text>
            <Text size={TextSize.Large} serif center color={Color.Text60}>{siteDescription}</Text>
            {shareAvailable ?
                <StyledFlex justifyContent={JustifyContent.Center}>
                    <Button iconLeft={<ShareIcon />} onClick={() => share()}>Share Website</Button>
                </StyledFlex>
                :
                <div />
            }
        </StyledWrapper>
    )
}