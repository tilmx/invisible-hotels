import { FunctionComponent, ReactNode } from 'react';
import { Text } from './text';
import { UnstyledLink } from './utils/link';
import { Button } from './button';
import { SendIcon } from 'lucide-react';
import styles from './placeholder-card.module.scss';
import clsx from 'clsx';

interface PlaceholderCardProps {
    children?: ReactNode;
    className?: string;
    emptyState: boolean;
}

export const PlaceholderCard: FunctionComponent<PlaceholderCardProps> = props => {
    return (
        <div className={clsx(styles.placeholderCard, props.emptyState && styles.emptyState, props.className)}>
            <Text center size="regular">{props.emptyState ? "It looks like we haven't been in such a place. Any tips?" : "You have a secret hotel tip for us or some feedback? Let us know!"}</Text>
            <UnstyledLink href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}?subject=${encodeURI('I have a secret hotel tip for you!')}&body=${encodeURI('Hey Annika and Tilman! \n\n I have a super secret hotel tip for you — here it is:')}`}>
                <Button iconLeft={<SendIcon />} small secondary>Send E-Mail</Button>
            </UnstyledLink>
        </div>
    )
}
