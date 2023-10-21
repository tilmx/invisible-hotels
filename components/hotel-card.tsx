import styled from '@emotion/styled';
import * as React from 'react';
import { Breakpoint, Color, Size } from './tokens';
import { Tag } from './tag';
import { Flex } from './utils';
import { Text, TextSize } from './text';

interface HotelCardProps {
    title: string;
    location: string;
    housingType: string;
    vacationType: string;
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
        padding: ${Size.M};
        border-radius: ${Size.S};
    }
`;

const StyledTitle = styled(Text)`
    padding-bottom: ${Size.XXS};
`;

const StyledTagList = styled(Flex)`
    padding-top: ${Size.XXS};
`;

export const HotelCard: React.FunctionComponent<HotelCardProps> = props => {
    return (
        <StyledCard>
            <div>
                <StyledTitle size={TextSize.Large}>{props.title}</StyledTitle>
                <Text serif>{props.location}</Text>
            </div>
            <StyledTagList gap={Size.XXS}>
                <Tag label={props.housingType} />
                <Tag label={props.vacationType} />
            </StyledTagList>
        </StyledCard>
    )
}
