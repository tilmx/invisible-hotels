import styled from '@emotion/styled';
import { FunctionComponent, MouseEventHandler } from 'react';
import { Breakpoint, Color, Size } from './tokens';
import { Text, TextSize } from './text';
import { getVacationTypeColor, getVacationTypeIcon } from '../utils';
import { Tag } from './tag';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { AlignItems, Flex, JustifyContent } from './utils';

interface HotelCardProps {
    title: string;
    location: string;
    housingType: string;
    vacationType: string;
    visited?: boolean;
    image?: {
        url: string;
        width: number;
        height: number;
    };
    links?: {
        bookingCom?: string;
        hotel?: string;
    };
    starred: boolean;
    onStarClick?: MouseEventHandler;
}

const StyledCard = styled.a<{ color?: string; }>`
    color: ${Color.TextAlways}; 
    text-decoration: none;
    background: ${props => props.color};
    padding: ${Size.XXS};
    border-radius: ${Size.M};
    min-height: 400px;
    display: flex;
    flex-direction: column;
    gap: ${Size.XXXS};
    transition: transform .2s, box-shadow .2s;
    transform: translate3d(0,0,0);
    overflow: hidden;

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
            background: ${Color.Text20};
            pointer-events: none;
        }
    }

    ${Breakpoint.TabletSmall} {
        min-height: 280px;
    }
`;

const StyledHeader = styled.div`
    flex: 1;
    position: relative;
`;

const StyledContent = styled.div<{ onImage: boolean }>`
    border-radius: ${Size.S};
    padding: ${Size.XS} ${Size.S};
    color: ${props => props.onImage && Color.BackgroundAlways};
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

const StyledTagList = styled.div`
    display: flex;
    gap: ${Size.XXS};
    padding: ${Size.XS} ${Size.S};
    flex-wrap: wrap;
`;

const StyledImageContainer = styled.div`
    border-radius: ${Size.S};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    backgroud: ${Color.Shadow};

    &:after {
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

const StyledStarArea = styled.div<{ starred: boolean; }>`
    padding: ${Size.XS};
    margin-top: -${Size.XXS};
    margin-right: -${Size.XS};
    border-radius: 50%;
    @media (hover: hover) {
       visibility: ${props => props.starred ? 'visible' : 'hidden'};
       :hover {
            background: ${Color.Text20};
            backdrop-filter: blur(${Size.XXS});
        }
    }
    :active {
        background: ${Color.Text20};
        backdrop-filter: blur(${Size.XXS});
    }
    svg {
        display: block;
        ${props => props.starred && `fill: currentColor`};
    }    
`;


export const HotelCard: FunctionComponent<HotelCardProps> = props => {
    return (
        <StyledCard href={props.links?.bookingCom || props.links?.hotel} color={getVacationTypeColor(props.vacationType)} target="_blank">
            <StyledHeader>
                <StyledContent onImage={typeof props.image !== 'undefined'}>
                    <Flex justifyContent={JustifyContent.SpaceBetween} alignItems={AlignItems.FlexStart}>
                        <Text size={TextSize.Large} bold>
                            {props.title}
                        </Text>
                        <StyledStarArea data-stararea starred={props.starred} onClick={props.onStarClick}>
                            <Star />
                        </StyledStarArea>
                    </Flex>
                    <Text serif>
                        {props.location}
                    </Text>
                </StyledContent>
                {props.image &&
                    <StyledImageContainer>
                        <div style={{ position: 'relative', height: '100%' }}>
                            <Image fill src={'/images/hotels/' + props.image.url} alt="Picture of Hotel" style={{ objectFit: 'cover' }} />
                        </div>
                    </StyledImageContainer>
                }
            </StyledHeader>
            <StyledTagList>
                <Tag icon={getVacationTypeIcon(props.vacationType)} label={props.vacationType} />
                <Tag label={props.housingType} />
            </StyledTagList>
        </StyledCard>
    )
}

/*
            
*/
