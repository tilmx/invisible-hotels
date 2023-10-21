import styled from '@emotion/styled';
import * as React from 'react';
import { Size } from './tokens';
import { Tag } from './tag';
import { Flex } from './utils';
import { Text } from './text';

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
    color: string;
}

const StyledCard = styled.div<{ color: string; }>`
    background: ${props => props.color};
    border-radius: ${Size.M};
    padding: ${Size.L};
`;

export const HotelCard: React.FunctionComponent<HotelCardProps> = props => {
    return (
        <StyledCard color={props.color}>
            <Text>{props.title}</Text>
            <Text serif>{props.location}</Text>
            <Flex gap={Size.XXS}>
                <Tag label={props.housing} />
                <Tag label={props.region} />
            </Flex>
        </StyledCard>
    )
}
