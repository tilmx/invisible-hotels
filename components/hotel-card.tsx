import styled from '@emotion/styled';
import * as React from 'react';
import { Breakpoint, Color, Size } from './tokens';
import { Tag } from './tag';
import { Flex, FlexAlignItems, FlexJustifyContent } from './utils';
import { Text, TextSize } from './text';
import { CheckCircle2, Hotel, MountainSnow, TreeDeciduous, Waves } from 'lucide-react';
import { HotelLink } from './hotel-link';

interface HotelCardProps {
    title: string;
    location: string;
    housingType: string;
    vacationType: string;
    visited?: boolean;
    links?: {
        bookingCom?: string;
        hotel?: string;
    };
}

const StyledCard = styled.div<{ color?: string }>`
    background: ${props => props.color || Color.Yellow};
    border-radius: ${Size.M};
    padding: ${Size.L};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 368px;
    transition: transform .3s;
    box-shadow: ${Size.XS} 0 ${Size.XXXL} rgba(0,0,0,.2);
    transform: translate3d(0,0,0);

    :hover {
        transform: scale(1.03);
    }

    ${Breakpoint.Tablet} {
        min-height: 256px;
    }

    ${Breakpoint.Mobile} {
        min-height: 192px;
        padding: ${Size.M};
        border-radius: ${Size.S};
    }
`;

const StyledTitle = styled(Text)`
    padding-bottom: ${Size.XXS};
    word-break: break-word;
`;

const StyledDetailList = styled(Flex)`
    padding-top: ${Size.XXS};
`;

const StyledTagList = styled(Flex)`
    gap: ${Size.XXS};

    ${Breakpoint.Mobile} {
        gap: ${Size.XXXS};
    }
`


export const HotelCard: React.FunctionComponent<HotelCardProps> = props => {
    return (
        <StyledCard color={getVacationTypeColor(props.vacationType)}>
            <div>
                <StyledTitle size={TextSize.Large}>
                    {props.title}
                </StyledTitle>
                <Text serif>{props.location}</Text>
            </div>
            <StyledDetailList gap={Size.XXS} justifyContent={FlexJustifyContent.SpaceBetween} alignItems={FlexAlignItems.FlexEnd}>
                <StyledTagList flexWrap='wrap'>
                    <Tag icon={getVacationTypeIcon(props.vacationType)} label={props.vacationType} />
                    <Tag label={props.housingType} />
                    {props.visited &&
                        <Tag icon={<CheckCircle2 />} label="Visited" />
                    }
                </StyledTagList>
                {props.links?.bookingCom &&
                    <HotelLink link={props.links?.bookingCom} color={getVacationTypeColor(props.vacationType)}>
                        Open on <br /> Booking.com
                    </HotelLink>
                }
                {props.links?.hotel &&
                    <HotelLink link={props.links?.hotel} color={getVacationTypeColor(props.vacationType)}>
                        Open hotel <br /> website
                    </HotelLink>
                }
            </StyledDetailList>
        </StyledCard>
    )
}

export function getVacationTypeIcon(vacationType: string) {
    switch (vacationType) {
        case "Sea":
            return <Waves />
        case "Mountains":
            return <MountainSnow />
        case "City":
            return <Hotel />
        case "Countryside":
            return <TreeDeciduous />
    }
}

export function getVacationTypeColor(vacationType: string) {
    switch (vacationType) {
        case "Sea":
            return Color.Blue
        case "Mountains":
            return Color.Green
        case "City":
            return Color.Red
        case "Countryside":
            return Color.Yellow
    }
}
