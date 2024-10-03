import { CSSProperties, FunctionComponent } from 'react';
import roomDistribution from '../data/room-distribution.json';
import { Text, TextSize } from './text';
import { Color } from './tokens/colors';
import styles from './room-distribution.module.scss'
import clsx from 'clsx';

export const RoomDistribution: FunctionComponent<{ rooms?: number }> = props => {
    const below120 = roomDistribution.distribution.slice(0, 12);
    const above120 = roomDistribution.distribution.slice(12).reduce((p, c) => ((p || 0) + (c || 0)), 0);

    const combinedArray = [...below120, above120]
    const maximum = Math.max(...combinedArray.map(item => item || 0));

    return (
        <div className={styles.container}>
            <Text size={TextSize.Small}>Compare hotel size</Text>
            <div className={styles.distribution}>
                {combinedArray.map((item, i) =>
                    <div className={clsx(styles.bar, (Math.min(Math.floor((props.rooms || 0) / 10), 12) === i && styles.highlighted))} style={{ '--height': `${Math.round((item || 0) / maximum * 100)}%` } as CSSProperties} key={i}>
                        <Text color={Color.Text} size={TextSize.Small}>{item || 'No'} Hotel{(item || 0) > 1 ? 's have' : ' has'} {Math.max(i * 10, 1)} {i !== combinedArray.length - 1 ? 'to ' + (i * 10 + 9) : 'or more'} rooms</Text>
                    </div>
                )}
            </div>
            <div className={styles.legend}>
                <Text size={TextSize.Small}>1</Text>
                <Text size={TextSize.Small}>120+</Text>
            </div>
        </div>
    )
}
