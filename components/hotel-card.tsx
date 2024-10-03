import styled from '@emotion/styled';
import { FunctionComponent, MouseEventHandler } from 'react';
import { Text, TextSize } from './text';
import { getHotelUrl, getVacationTypeColor, getVacationTypeIcon } from '../utils';
import { Tag } from './tag';
import Image from 'next-image-export-optimizer';
import { StarIcon } from 'lucide-react';
import { Color } from './tokens/colors';
import { Breakpoint } from './tokens/breakpoint';
import { UnstyledLink } from './utils/link';
import { VisitedBadge } from './visited-badge';
import { HotelPreview, NearbyHotelPreview } from '../types';

type HotelCardProps = {
    hotel: (HotelPreview & { distance?: number }) | NearbyHotelPreview;
    starred?: boolean;
    onStarClick?: MouseEventHandler;
    small?: boolean;
    className?: string;
};

const StyledCard = styled(UnstyledLink) <{ color?: string; small?: boolean; }>`
    color: ${Color.TextAlways}; 
    text-decoration: none;
    background: ${props => props.color};
    padding: var(--size-xxs);
    border-radius: var(--size-m);
    ${props => !props.small && 'min-height: 400px;'}
    display: flex;
    flex-direction: column;
    gap: var(--size-xxxs);
    transition: transform .2s, box-shadow .2s;
    transform: translate3d(0,0,0);

    @media (hover: hover) {
        :hover {
            transform: scale(1.03);
            box-shadow: 0 var(--size-s) var(--size-xxxl) ${Color.Shadow}, 0 var(--size-xxxs) var(--size-s) ${Color.Shadow};
            [data-stararea] {
                visibility: visible;
            } 
        }
    }

    :active {
        :after {
            content: '';
            position: absolute;
            display: block;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            background: ${Color.TextAlways};
            opacity: .1;
            pointer-events: none;
            border-radius: var(--size-m);
        }
    }

    ${Breakpoint.TabletSmall} {
        ${props => !props.small && 'min-height: 280px;'}
    }
`;

const StyledHeader = styled.div`
    flex: 1;
    position: relative;
`;

const StyledContent = styled.div<{ image: boolean }>`
    border-radius: var(--size-s);
    padding: var(--size-xs) var(--size-s);
    color: ${props => props.image && Color.BackgroundAlways};
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: var(--size-xxs);
    z-index: 1;
    position: relative;
    word-break: break-word;

    ${Breakpoint.Mobile} {
        gap: var(--size-xxxs);
    }
`;

const StyledDetails = styled.div<{ visited?: boolean; }>`
    display: flex;
    align-items: flex-end;
    padding: var(--size-xs) var(--size-s);
    gap: var(--size-xxs);

    ${props => props.visited && `
        margin-right: calc(var(--size-xxl) + var(--size-xs));

        ${Breakpoint.Mobile} {
            margin-right: var(--size-xxl);

        }
    `}
`;

const StyledTagList = styled.div`
    display: flex;
    gap: var(--size-xxs);
    flex-wrap: wrap;
    align-items: stretch;
`;

const StyledVisitedBadge = styled(VisitedBadge)`
    position: absolute;
    right: var(--size-s);
`;

const StyledImageContainer = styled.div`
    border-radius: var(--size-s);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: ${Color.Shadow};

    :after {
        content: '';
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 50%;
        background: linear-gradient(${Color.TextAlways} 30%, transparent);
        opacity: .5;
    }
`;

const StyledImage = styled(Image)`
    object-fit: cover; 
    background: ${Color.Text60};
`;

const StyledTitle = styled(Text)`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;


const StyledStarArea = styled(StarIcon, {
    shouldForwardProp: prop => prop !== 'starred'
}) <{ starred?: boolean; }>`
    padding: var(--size-xs);
    margin-top:calc(-1 * var(--size-xxs));
    margin-right: calc(-1 * var(--size-xs));
    border-radius: 50%;
    display: block;
    flex-shrink: 0;
    ${props => props.starred && `fill: currentColor`}; 

    @media (hover: hover) {
       visibility: ${props => props.starred ? 'visible' : 'hidden'};
       :hover {
            background: ${Color.Text10};
            backdrop-filter: blur(var(--size-xxs));
        }
    }
    :active {
        background: ${Color.Text20};
        backdrop-filter: blur(var(--size-xxs));
    }
`;

const StyledDistanceArea = styled(Text)`
    padding: var(--size-xxxs) var(--size-xs);
    margin-top: var(--size-xxs);
    border-radius: var(--size-xs);
    backdrop-filter: blur(var(--size-xxs));
    position: relative;
    margin-right: auto;

    :after {
        content: '';
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: currentColor;
        opacity: .15;
        border-radius: var(--size-xs);
    }
`;

export const HotelCard: FunctionComponent<HotelCardProps> = props => {
    return (
        <StyledCard small={props.small} href={getHotelUrl({ id: props.hotel.id, housingType: props.hotel.housingType })} color={getVacationTypeColor(props.hotel.vacationType)} className={props.className}>
            <StyledHeader>
                <StyledContent image={typeof props.hotel.image !== 'undefined'}>
                    <StyledTitle as="h3" size={props.small ? TextSize.Large : TextSize.SuperLarge} bold >
                        {props.hotel.name}
                        {props.onStarClick &&
                            <StyledStarArea
                                data-stararea
                                starred={props.starred}
                                onClick={props.onStarClick}
                            />
                        }
                    </StyledTitle>
                    <Text size={TextSize.Large} serif>
                        {`${props.hotel.city}, ${props.hotel.country}`}
                    </Text>
                    {typeof props.hotel.distance !== 'undefined' &&
                        <StyledDistanceArea>
                            {props.hotel.distance === 0 ? '<1' : props.hotel.distance} km away
                        </StyledDistanceArea>
                    }
                </StyledContent>
                {props.hotel.image &&
                    <StyledImageContainer>
                        <StyledImage fill sizes="400px" src={'/images/hotels/' + props.hotel.image.url} alt={`Picture of ${props.hotel.name}`} placeholder="blur" />
                    </StyledImageContainer>
                }
            </StyledHeader>
            <StyledDetails visited={props.hotel.visited}>
                <StyledTagList>
                    <Tag icon={getVacationTypeIcon(props.hotel.vacationType, true)} label={props.hotel.vacationType} />
                    <Tag label={props.hotel.housingType} />
                </StyledTagList>
                {props.hotel.visited &&
                    <StyledVisitedBadge superSmall />
                }
            </StyledDetails>
        </StyledCard>
    )
}
