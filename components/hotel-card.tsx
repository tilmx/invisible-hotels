import styled from '@emotion/styled';
import * as React from 'react';
import { Breakpoint, Color, Size } from './tokens';
import { Tag } from './tag';
import { Flex } from './utils';
import { Text, TextSize } from './text';
import { CheckCircle2, Hotel, MountainSnow, TreeDeciduous, Waves } from 'lucide-react';

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

const StyledCard = styled.a<{ color?: string }>`
    display: block;
    text-decoration: none;
    color: inherit;
    background: ${props => props.color || Color.Yellow};
    border-radius: ${Size.M};
    padding: ${Size.L};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 360px;
    transition: transform .2s, box-shadow .2s;
    transform: translate3d(0,0,0);

    :hover {
        transform: scale(1.03);
        box-shadow: 0 ${Size.S} ${Size.XXXL} rgba(0,0,0,.3), 0 ${Size.XXXS} ${Size.S} rgba(0,0,0,0.2);
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
    padding-bottom: ${Size.XS};
    word-break: break-word;
`;

const StyledTagList = styled(Flex)`
    gap: ${Size.XXS};

    ${Breakpoint.Mobile} {
        gap: ${Size.XXXS};
    }
`


export const HotelCard: React.FunctionComponent<HotelCardProps> = props => {
    return (
        <StyledCard href={props.links?.bookingCom || props.links?.hotel} target="_blank" color={getVacationTypeColor(props.vacationType)}>
            <div>
                <StyledTitle size={TextSize.Large}>
                    {props.title}
                </StyledTitle>
                <Text serif>{props.location}</Text>
            </div>
            <StyledTagList flexWrap='wrap'>
                <Tag icon={getVacationTypeIcon(props.vacationType)} label={props.vacationType} />
                <Tag label={props.housingType} />
                {props.visited &&
                    <Tag icon={<CheckCircle2 />} label="Visited" />
                }
            </StyledTagList>
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
