import styled from '@emotion/styled'
import { FunctionComponent } from 'react';
import roomDistribution from '../data/room-distribution.json';
import { Size } from './tokens/size';
import { AlignItems, Flex, JustifyContent } from './utils/flex';
import { Text, TextSize } from './text';
import { Color } from './tokens/colors';
import { HelpCircleIcon } from 'lucide-react';

const StyledContainer = styled.div`
    background: rgba(0,0,0,0.07);
    padding: ${Size.XS} ${Size.S};
    margin-top: ${Size.XS};
    border-radius: ${Size.XS};
`;

const StyledDistribution = styled.div`
    display: flex;
    gap: ${Size.XXXXS};
    height: ${Size.XL};
    margin: ${Size.XS} 0 ${Size.XXS};
    align-items: flex-end;
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
        width: calc(${Size.XXXL} + ${Size.XL});
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
    const below120 = roomDistribution.distribution.slice(0, 12);
    const above120 = roomDistribution.distribution.slice(12).reduce((p, c) => ((p || 0) + (c || 0)), 0);

    const combinedArray = [...below120, above120]
    const maximum = Math.max(...combinedArray.map(item => item || 0));

    return (
        <StyledContainer>
            <Flex alignItems={AlignItems.Center} gap={Size.XXXS}>
                <HelpCircleIcon size={Size.S} />
                <Text size={TextSize.Small}>Compare hotel size</Text>
            </Flex>
            <StyledDistribution>
                {combinedArray.map((item, i) =>
                    <StyledBar highlighted={Math.min(Math.floor((props.rooms || 0) / 10), 12) === i} height={(item || 0) / maximum * 100} key={i}>
                        <Text color={Color.Text} size={TextSize.Small}>{item || 'No'} Hotel{(item || 0) > 1 ? 's have' : ' has'} {Math.max(i * 10, 1)} {i !== combinedArray.length - 1 ? 'to ' + (i * 10 + 9) : 'or more'} rooms</Text>
                    </StyledBar>
                )}
            </StyledDistribution>
            <Flex justifyContent={JustifyContent.SpaceBetween} alignItems={AlignItems.Center}>
                <Text size={TextSize.Small}>1</Text>
                <Text size={TextSize.Small}>120+</Text>
            </Flex>
        </StyledContainer>
    )
}
