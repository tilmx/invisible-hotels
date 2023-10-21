import styled from '@emotion/styled';
import * as React from 'react';
import { Breakpoint, Color, Size } from './tokens';
import { Tag } from './tag';
import { Flex } from './utils';
import { Text, TextSize } from './text';

export enum Housing {
    Hotel = 'Hotel',
    Apartment = 'Apartment'
}

export enum Region {
    Sea = 'At the Sea',
    Countryside = 'Countryside',
    Mountains = 'Mountains',
    City = 'City'
}

interface HotelCardProps {
    title: string;
    location: string;
    housing: Housing;
    region: Region;
}

const StyledCard = styled.div`
    background: ${Color.Yellow};
    border-radius: ${Size.M};
    padding: ${Size.L};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 368px;
    transition: transform .3s;

    :hover {
        transform: scale(1.03);
    }

    ${Breakpoint.Tablet} {
        min-height: 256px;
    }

    ${Breakpoint.Mobile} {
        min-height: 192px;
    }
`;

export const HotelCard: React.FunctionComponent<HotelCardProps> = props => {
    return (
        <StyledCard>
            <div>
                <Text size={TextSize.Large}>{props.title}</Text>
                <Text serif>{props.location}</Text>
            </div>
            <Flex gap={Size.XXS}>
                <Tag label={props.housing} />
                <Tag label={props.region} />
            </Flex>
        </StyledCard>
    )
}
