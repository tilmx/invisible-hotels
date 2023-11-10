import styled from '@emotion/styled'
import { FunctionComponent } from 'react';
import roomDistribution from '../data/room-distribution.json';
import { Size } from './tokens/size';
import { AlignItems, Flex, JustifyContent } from './utils/flex';
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
        z-index: 1;
        position: absolute;
        top: calc(${Size.XL} + ${Size.XXS});
        background: ${Color.Background80};
        backdrop-filter: blur(${Size.XXS});
        padding: ${Size.XS};
        border-radius: ${Size.XS};
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
    const below100 = roomDistribution.distribution.slice(0, 12);
    const above100 = roomDistribution.distribution.slice(12).reduce((p, c) => ((p || 0) + (c || 0)), 0);

    const combinedArray = [...below100, above100]
    const maximum = Math.max(...combinedArray.map(item => item || 0));

    return (
        <StyledContainer>
            <StyledDistribution>
                {combinedArray.map((item, i) =>
                    <StyledBar highlighted={Math.floor((props.rooms || 0) / 10) === i} height={(item || 0) / maximum * 100} key={i}>
                        <Text size={TextSize.Small}>{item} Hotels have {Math.max(i * 10, 1)} {i !== combinedArray.length - 1 ? '- ' + (i * 10 + 9) : 'or more'} rooms</Text>
                    </StyledBar>
                )}
            </StyledDistribution>
            <Flex justifyContent={JustifyContent.SpaceBetween} alignItems={AlignItems.Center}>
                <Text size={TextSize.Small}>1 Room</Text>
                <Text size={TextSize.Small}>120+</Text>
            </Flex>
        </StyledContainer>
    )
}
