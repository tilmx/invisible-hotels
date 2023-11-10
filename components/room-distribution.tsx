import styled from '@emotion/styled'
import { FunctionComponent } from 'react';
import roomDistribution from '../data/room-distribution.json';
import { Size } from './tokens/size';
import { Flex, JustifyContent } from './utils/flex';
import { Text, TextSize } from './text';

const StyledContainer = styled.div`
    margin: 0 auto;
`;

const StyledDistribution = styled.div`
    display: flex;
    gap: ${Size.XXXXS};
    height: 40px;
    align-items: flex-end;
    margin-bottom: ${Size.XXS};
`;

const StyledBar = styled.div<{ height: number; highlighted: boolean }>`
    width: ${Size.XXXS};
    height: ${props => props.height}%;
    min-height: ${Size.XXXXS};
    background: currentColor;
    border-radius: ${Size.XXS};
    opacity: ${props => props.highlighted ? '1' : props.height > 0 ? '.4' : '.2'};
    position: relative;

    ${props => props.highlighted && `
        &:after {
            content: '';
            position: absolute;
            bottom: -${Size.S};
            display: block;
            height: ${Size.XXXS};
            width: ${Size.XXXS};
            border-radius: 50%;
            background: currentColor;
        }
    `}
`;

export const RoomDistribution: FunctionComponent<{ rooms?: number }> = props => {
    const maximum = Math.max(...roomDistribution.distribution.map(item => item || 0));
    return (
        <StyledContainer>

            <StyledDistribution>
                {roomDistribution.distribution.map((item, i) => <StyledBar highlighted={Math.floor((props.rooms || 0) / 10) === i} height={(item || 0) / maximum * 100} key={i} />)}
            </StyledDistribution>
            <Flex justifyContent={JustifyContent.SpaceBetween}>
                <Text size={TextSize.Small}>1</Text>
                <Text size={TextSize.Small}>{roomDistribution.maximum.toString()}</Text>
            </Flex>
        </StyledContainer>
    )
}
