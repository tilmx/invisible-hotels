import { FunctionComponent, ReactNode } from 'react';
import { Wrapper } from './wrapper';
import styles from './hotel-list-wrapper.module.scss';

export const HotelListWrapper: FunctionComponent<{ children?: ReactNode; className?: string; }> = props => {
    return (
        <Wrapper wide className={props.className}>
            <div className={styles.hotelListWrapper}>
                {props.children}
            </div>
        </Wrapper>
    )
}
