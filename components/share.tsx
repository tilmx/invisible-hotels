import { FunctionComponent, useEffect, useState } from "react";
import { Button } from "./button";
import { ShareIcon } from "lucide-react";
import { siteDescription, siteTitle } from "../data/site";
import { Text } from "./text";
import { Color } from "./tokens/colors";
import { AccentStyle, AccentedText } from "./accented-text";
import { Wrapper } from "./wrapper";
import styles from './share.module.scss';

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
                title: siteTitle,
                text: 'Check out our personal list of lovely, minimalistic, and fancy hotels & apartments',
                url: `https://${process.env.NEXT_PUBLIC_DOMAIN}/`,
            }).catch((error) => console.log('Something went wrong with sharing: ', error));
        }
    }

    return (
        <Wrapper className={styles.share}>
            <Text size="superlarge" center bold>
                <AccentedText color={Color.Text80} accentStyle={AccentStyle.Circled}>
                    {siteTitle}
                </AccentedText>
            </Text>
            <Text size="large" serif center color={Color.Text60}>{siteDescription}</Text>
            {shareAvailable ?
                <div className={styles.shareContainer}>
                    <Button iconLeft={<ShareIcon />} onClick={() => share()}>Share Website</Button>
                </div>
                :
                <div />
            }
        </Wrapper>
    )
}