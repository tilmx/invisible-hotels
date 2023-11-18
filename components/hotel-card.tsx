import styled from '@emotion/styled';
import { FunctionComponent, MouseEventHandler } from 'react';
import { Text, TextSize } from './text';
import { getHotelUrl, getVacationTypeColor, getVacationTypeIcon } from '../utils';
import { Tag } from './tag';
import Image from 'next-image-export-optimizer';
import { StarIcon } from 'lucide-react';
import { Flex } from './utils/flex';
import { Color } from './tokens/colors';
import { Size } from './tokens/size';
import { Breakpoint } from './tokens/breakpoint';
import { UnstyledLink } from './utils/link';
import { VisitedBadge } from './visited-badge';

interface HotelCardProps {
    name: string;
    city: string;
    country: string;
    distance?: number;
    housingType: string;
    vacationType: string;
    visited?: boolean;
    image?: {
        url: string;
        width: number;
        height: number;
    };
    id: string;
    starred?: boolean;
    onStarClick?: MouseEventHandler;
    small?: boolean;
    className?: string;
}

const StyledCard = styled(UnstyledLink) <{ color?: string; small?: boolean; }>`
    color: ${Color.TextAlways}; 
    text-decoration: none;
    background: ${props => props.color};
    padding: ${Size.XXS};
    border-radius: ${Size.M};
    ${props => !props.small && 'min-height: 400px;'}
    display: flex;
    flex-direction: column;
    gap: ${Size.XXXS};
    transition: transform .2s, box-shadow .2s;
    transform: translate3d(0,0,0);

    @media (hover: hover) {
        :hover {
            transform: scale(1.03);
            box-shadow: 0 ${Size.S} ${Size.XXXL} ${Color.Shadow}, 0 ${Size.XXXS} ${Size.S} ${Color.Shadow};
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
    border-radius: ${Size.S};
    padding: ${Size.XS} ${Size.S};
    color: ${props => props.image && Color.BackgroundAlways};
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: ${Size.XXS};
    z-index: 1;
    position: relative;
    word-break: break-word;

    ${Breakpoint.Mobile} {
        gap: ${Size.XXXS};
    }
`;

const StyledDetails = styled.div<{ visited?: boolean; }>`
    display: flex;
    align-items: flex-end;
    padding: ${Size.XS} ${Size.S};
    gap: ${Size.XXS};

    ${props => props.visited && `
        margin-right: calc(${Size.XXL} + ${Size.XS});

        ${Breakpoint.Mobile} {
            margin-right: ${Size.XXL};

        }
    `}
`;

const StyledTagList = styled.div`
    display: flex;
    gap: ${Size.XXS};
    flex-wrap: wrap;
    align-items: stretch;
`;

const StyledVisitedBadge = styled(VisitedBadge)`
    position: absolute;
    right: ${Size.S};
`;

const StyledImageContainer = styled.div`
    border-radius: ${Size.S};
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

const StyledStarArea = styled(StarIcon) <{ starred?: boolean; }>`
    padding: ${Size.XS};
    margin-top: -${Size.XXS};
    margin-right: -${Size.XS};
    border-radius: 50%;
    display: block;
    flex-shrink: 0;
    ${props => props.starred && `fill: currentColor`}; 

    @media (hover: hover) {
       visibility: ${props => props.starred ? 'visible' : 'hidden'};
       :hover {
            background: ${Color.Text10};
            backdrop-filter: blur(${Size.XXS});
        }
    }
    :active {
        background: ${Color.Text20};
        backdrop-filter: blur(${Size.XXS});
    }
`;

const StyledDistanceArea = styled.div`
    padding: ${Size.XXXS} ${Size.XS};
    margin-top: ${Size.XXS};
    border-radius: ${Size.XS};
    backdrop-filter: blur(${Size.XXS});
    position: relative;

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
        border-radius: ${Size.XS};
    }
`;

export const HotelCard: FunctionComponent<HotelCardProps> = props => {
    return (
        <StyledCard small={props.small} href={getHotelUrl({ id: props.id, housingType: props.housingType })} color={getVacationTypeColor(props.vacationType)} className={props.className}>
            <StyledHeader>
                <StyledContent image={typeof props.image !== 'undefined'}>
                    <StyledTitle size={props.small ? TextSize.Large : TextSize.SuperLarge} bold >
                        {props.name}
                        {props.onStarClick &&
                            <StyledStarArea data-stararea starred={props.starred} onClick={props.onStarClick} />
                        }
                    </StyledTitle>
                    <Text size={TextSize.Large} serif>
                        {`${props.city}, ${props.country}`}
                    </Text>
                    {typeof props.distance !== 'undefined' &&
                        <Flex>
                            <StyledDistanceArea>
                                <Text>
                                    {props.distance === 0 ? '<1' : props.distance} km away
                                </Text>
                            </StyledDistanceArea>
                        </Flex>
                    }
                </StyledContent>
                {props.image &&
                    <StyledImageContainer>
                        <StyledImage fill sizes="400px" src={'/images/hotels/' + props.image.url} alt={`Picture of ${props.name}`} placeholder="blur" />
                    </StyledImageContainer>
                }
            </StyledHeader>
            <StyledDetails visited={props.visited}>
                <StyledTagList>
                    <Tag icon={getVacationTypeIcon(props.vacationType, true)} label={props.vacationType} />
                    <Tag label={props.housingType} />
                </StyledTagList>
                {props.visited &&
                    <StyledVisitedBadge superSmall />
                }
            </StyledDetails>
        </StyledCard>
    )
}
