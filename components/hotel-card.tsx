import { CSSProperties, FunctionComponent, MouseEventHandler } from 'react';
import { Text, TextSize } from './text';
import { getHotelUrl, getVacationTypeColor, getVacationTypeIcon } from '../utils';
import { Tag } from './tag';
import Image from 'next-image-export-optimizer';
import { StarIcon } from 'lucide-react';
import { UnstyledLink } from './utils/link';
import { VisitedBadge } from './visited-badge';
import { HotelPreview, NearbyHotelPreview } from '../types';
import styles from './hotel-card.module.scss';
import clsx from 'clsx';

type HotelCardProps = {
    hotel: (HotelPreview & { distance?: number }) | NearbyHotelPreview;
    starred?: boolean;
    onStarClick?: MouseEventHandler;
    small?: boolean;
    className?: string;
};

export const HotelCard: FunctionComponent<HotelCardProps> = props => {
    return (
        <UnstyledLink className={clsx(styles.card, props.small && styles.small, props.className)} style={{ '--color': getVacationTypeColor(props.hotel.vacationType) } as CSSProperties} href={getHotelUrl({ id: props.hotel.id, housingType: props.hotel.housingType })}>
            <div className={styles.header}>
                <div className={clsx(styles.content, typeof props.hotel.image !== 'undefined' && styles.image)}>
                    <Text className={styles.title} as="h3" size={props.small ? TextSize.Large : TextSize.SuperLarge} bold >
                        {props.hotel.name}
                        {props.onStarClick &&
                            <StarIcon
                                className={clsx(styles.starArea, props.starred && styles.starred)}
                                data-stararea
                                onClick={props.onStarClick}
                            />
                        }
                    </Text>
                    <Text size={TextSize.Large} serif>
                        {`${props.hotel.city}, ${props.hotel.country}`}
                    </Text>
                    {typeof props.hotel.distance !== 'undefined' &&
                        <Text className={styles.distance}>
                            {props.hotel.distance === 0 ? '<1' : props.hotel.distance} km away
                        </Text>
                    }
                </div>
                {props.hotel.image &&
                    <div className={styles.imageContainer}>
                        <Image className={styles.image} fill sizes="400px" src={'/images/hotels/' + props.hotel.image.url} alt={`Picture of ${props.hotel.name}`} placeholder="blur" />
                    </div>
                }
            </div>
            <div className={clsx(styles.details, props.hotel.visited && styles.visited)}>
                <div className={styles.tagList}>
                    <Tag icon={getVacationTypeIcon(props.hotel.vacationType, true)} label={props.hotel.vacationType} />
                    <Tag label={props.hotel.housingType} />
                </div>
                {props.hotel.visited &&
                    <VisitedBadge className={styles.visitedBadge} superSmall />
                }
            </div>
        </UnstyledLink>
    )
}
