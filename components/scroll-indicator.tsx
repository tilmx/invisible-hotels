import { ArrowDown } from 'lucide-react';
import { FunctionComponent, MouseEventHandler, useEffect, useState } from 'react';
import styles from './scroll-indicator.module.scss';
import clsx from 'clsx';

export const ScrollIndicator: FunctionComponent<{ onClick: MouseEventHandler }> = props => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(window.scrollY < 200);
        window.addEventListener('scroll', listenToScroll);
        return () => {
            window.removeEventListener('scroll', listenToScroll);
        }
    }, [])

    const listenToScroll = () => {
        setVisible(window.scrollY < 200);
    }

    return (
        <div className={clsx(styles.scrollIndicator, visible && styles.visible)} onClick={props.onClick}>
            <ArrowDown />
        </div>
    )
}
