import { FunctionComponent, useEffect, useState } from "react";
import { Button } from "./button";
import { Flex, JustifyContent } from "./utils";
import { ShareIcon } from "lucide-react";
import styled from "@emotion/styled";
import { Size } from "./tokens";

const StyledFlex = styled(Flex)`
    margin-top: ${Size.XXXXL};
`;

export const Share: FunctionComponent = () => {
    const [shareAvailable, setShareAvailable] = useState(false);

    useEffect(() => {
        if (navigator.share!) {
            setShareAvailable(true)
        }
    }, [])

    function share() {
        if (navigator.share) {
            navigator.share({
                title: 'Invisible Hotels',
                text: 'Check out our personal list of lovely, minimalistic and fancy hotels & apartments',
                url: 'https://invisible-hotels.com/',
            })
                .catch((error) => console.log('Something went wrong with sharing: ', error));
        }
    }

    return (
        shareAvailable ?
            <StyledFlex justifyContent={JustifyContent.Center}>
                <Button iconLeft={<ShareIcon />} onClick={() => share()}>Share Website</Button>
            </StyledFlex>
            :
            <div />
    )
}