import { FunctionComponent } from 'react';
import styles from './visited-badge.module.scss';
import clsx from 'clsx';

export const VisitedBadge: FunctionComponent<{ small?: boolean; superSmall?: boolean; className?: string; }> = props => {
    return (
        <div className={clsx(styles.badge, props.small && styles.small, props.superSmall && styles.superSmall, props.className)} >
            <div className={clsx(styles.emoji, props.superSmall && styles.superSmall)}>✌️</div>
            {props.superSmall ?
                <img src="/images/visited-badge-small.svg" width={72} height={72} alt="We stayed here" />
                :
                <img src="/images/visited-badge-large.svg" width={200} height={200} alt="We stayed here" />
            }
        </div>
    )
}
