import styled from '@emotion/styled'
import { FunctionComponent } from 'react';
import roomDistribution from '../data/room-distribution.json';
import { Size } from './tokens/size';
import { Flex, JustifyContent } from './utils/flex';
import { Text, TextSize } from './text';
import { Color } from './tokens/colors';

const StyledContainer = styled.div`
    background: rgba(0,0,0,0.07);
    padding: ${Size.XS} ${Size.S};
    margin-top: ${Size.XXS};
    border-radius: ${Size.XS};
`;

const StyledDistribution = styled.div`
    display: flex;
    gap: ${Size.XXXXS};
    height: ${Size.XL};
    align-items: flex-end;
    margin-bottom: ${Size.XXS};
`;

const StyledBar = styled.div<{ height: number; highlighted: boolean }>`
    width: ${Size.XS};
    position: relative;
    height: 100%;

    :after {
        content: '';
        position: absolute;
        display: block;
        bottom: 0;
        height: ${props => props.height}%;
        width: 100%;
        min-height: ${Size.XXXS};
        background: currentColor;
        border-radius: ${Size.XXXS};
        opacity: ${props => props.highlighted ? '1' : '.2'};
    }

    div {
        display: none;
        position: absolute;
        top: calc(${Size.XL} + ${Size.XXS});
        background: ${Color.Background80};
        backdrop-filter: blur(${Size.XXS});
        padding: ${Size.XS};
        border-radius: ${Size.XXS};
        width: ${Size.XXXL};
    }

    @media (hover: hover) {
        &:hover {
            &:after {
                opacity: .8;
            }
            div {
                display: block;
            }
        }
    }
`;

export const RoomDistribution: FunctionComponent<{ rooms?: number }> = props => {
    const maximum = Math.max(...roomDistribution.distribution.map(item => item || 0));
    return (
        <StyledContainer>
            <StyledDistribution>
                {roomDistribution.distribution.filter((_, i) => i < 10).map((item, i) =>
                    <StyledBar highlighted={Math.floor((props.rooms || 0) / 10) === i} height={(item || 0) / maximum * 100} key={i}>
                        <Text size={TextSize.Small}>{item} Hotels have {Math.max(i * 10, 1)} - {i * 10 + 9} rooms</Text>
                    </StyledBar>
                )}
            </StyledDistribution>
            <Flex justifyContent={JustifyContent.SpaceBetween}>
                <Text size={TextSize.Small}>1</Text>
                <Text size={TextSize.Small}>100+</Text>
            </Flex>
        </StyledContainer>
    )
}
