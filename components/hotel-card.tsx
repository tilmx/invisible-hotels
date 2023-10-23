import styled from '@emotion/styled';
import { Breakpoint, Color, Size } from './tokens';
import { Tag } from './tag';
import { AlignItems, Flex, JustifyContent } from './utils';
import { Text, TextSize } from './text';
import { Hotel, MountainSnow, Star, TreeDeciduous, Waves } from 'lucide-react';
import { FunctionComponent, MouseEventHandler } from 'react';

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
    starred: boolean;
    onStarClick?: MouseEventHandler;
}

const StyledCard = styled.a<{ color?: string; }>`
    display: block;
    text-decoration: none;
    color: inherit;
    background: ${props => props.color || Color.Yellow};
    border-radius: ${Size.M};
    padding: ${Size.L};
    display: flex;
    gap: ${Size.XS};
    flex-direction: column;
    justify-content: space-between;
    min-height: 360px;
    transition: transform .2s, box-shadow .2s;
    transform: translate3d(0,0,0);
    overflow: hidden;

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

    @media (hover: hover) {
        :hover {
            transform: scale(1.03);
            box-shadow: 0 ${Size.S} ${Size.XXXL} ${Color.Shadow}, 0 ${Size.XXXS} ${Size.S} ${Color.Shadow};

            [data-stararea] {
                visibility: visible;
            } 
        }
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

const StyledStarArea = styled.div<{ starred: boolean; }>`
    padding: ${Size.XS};
    margin-top: -${Size.XS};
    margin-right: -${Size.XS};
    border-radius: 50%;

    @media (hover: hover) {
        visibility: ${props => props.starred ? 'visible' : 'hidden'};
    }

    svg {
        display: block;
        ${props => props.starred && `fill: ${Color.Text}`};
    }

    :hover {
        background: ${Color.Text20};
    }
`;

const StyledTagList = styled(Flex)`
    gap: ${Size.XXS};

    ${Breakpoint.Mobile} {
        gap: ${Size.XXXS};
    }
`

const StyledVisitedTag = styled.svg`
    ${Breakpoint.Mobile} {
        height: ${Size.XL};
        width: auto;
    }
`;

export const HotelCard: FunctionComponent<HotelCardProps> = props => {
    return (
        <StyledCard href={props.links?.bookingCom || props.links?.hotel} target="_blank" color={getVacationTypeColor(props.vacationType)}>
            <div>
                <Flex justifyContent={JustifyContent.SpaceBetween} alignItems={AlignItems.FlexStart} gap={Size.XXXS}>
                    <StyledTitle size={TextSize.Large}>
                        {props.title}
                    </StyledTitle>
                    <StyledStarArea data-stararea starred={props.starred} onClick={props.onStarClick}>
                        <Star />
                    </StyledStarArea>
                </Flex>
                <Text serif>{props.location}</Text>
            </div>
            <Flex justifyContent={JustifyContent.SpaceBetween} alignItems={AlignItems.FlexEnd} gap={Size.XXXS}>
                <StyledTagList flexWrap='wrap'>
                    <Tag icon={getVacationTypeIcon(props.vacationType)} label={props.vacationType} />
                    <Tag label={props.housingType} />
                </StyledTagList>
                {props.visited &&
                    <StyledVisitedTag width="68" height="69" viewBox="0 0 68 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 18.4997C1.56437 19.4168 1.86243 19.1644 2.53967 20.5189C3.38623 22.2121 4.8677 25.8099 5.9259 25.8099C6.9841 25.8099 6.15344 19.4997 7 19.4997C7.84656 19.4997 13.9682 23.0586 13.9682 22.0004C13.9682 21.3947 12.1667 19.5573 11.5 17.5573C10.5 14.5573 11.181 15.2666 11 13.9997M31.0371 1C28.0036 2.62257 15.2063 10.3142 15.037 11.4994C14.8253 12.9809 15.5634 13.8045 16.1983 15.7093C16.8332 17.614 16.7093 19.6343 19.0373 18.9994C20.8998 18.4915 34.473 8.84597 35.0373 7.99941M16.5371 15.499C19.1853 14.5466 24.5371 11.499 29.5371 7.49902M15.8737 46.0264C15.521 45.9558 14.8579 45.984 15.0272 46.6613C15.2388 47.5078 23.6833 57.8571 25.5881 59.9735M27.0423 52.8994C25.4197 54.0282 21.9206 56.5396 20.9048 57.5555L19 59.4602M23.0488 47.2744C24.883 49.4614 32.6534 58.1851 33.5 60.2168M32.0137 39C30.3206 39.4938 27.169 41.9683 26.9997 44C26.788 46.5397 30.028 49.3569 31.2978 50.8384C32.5676 52.3199 33.8375 53.8013 36.1655 52.3199C38.0279 51.1347 38.2113 50.1329 38.0702 49.7802M31.8154 49.9328C33.0853 49.0863 35.7942 47.1815 36.4715 46.335M42.1523 50.1011C41.4468 48.408 39.8243 44.6408 38.9777 43.117C37.9195 41.2122 35.8031 39.7308 36.0148 38.8842C36.2264 38.0376 39.8244 34.4398 40.6709 35.0747C41.0758 35.3783 42.4266 38.5191 42.1514 40.5518C41.9662 41.9194 40.2346 42.1239 40.036 43.117L49.9831 44.3869M59.5166 36.9424C59.3755 37.5773 58.1938 37.8148 57.5166 39C56.67 40.4815 50.9788 42.3862 48.0159 39C43.9011 34.2974 53.4076 27.9691 56.58 26M56.5166 33.9424L49.1729 39.1219M34.9264 67.4655C33.9341 67.5894 32.2224 67.6016 33.314 66.6591C34.6786 65.4809 46.4019 54.4436 55.2712 48.8013C62.3667 44.2875 65.7531 42.6218 66.5593 42.3532L66.7452 43.8416M6.27654 35.3699C4.52714 36.6482 1.51084 39.5 3.44089 40.6811C5.85345 42.1574 9.74207 41.2213 10.9483 41.9595C12.1546 42.6976 11.0299 46.5684 9.31925 48.0088C7.60858 49.4492 4.94397 49.0621 5.097 45.4253M18.3564 42.8169C16.256 43.8671 11.6759 32.1321 11.3564 31.2598M8.35645 33.3003C12.6692 28.9876 15.8356 27.3023 15.3564 28.2607M22.8564 39C21.8564 39.5 21.3564 34 20.8564 32L19.3564 26C20.8564 27.3333 24.2564 30.2 25.8564 31C27.4564 31.8 29.1898 32.3333 29.8564 32.5M17.3564 35C19.0231 34 22.5564 31.7 23.3564 30.5M24.3564 23.3438C24.5231 24.3438 24.4564 25.0012 26.8564 25.4012C28.1048 25.6092 31.2647 26.6893 31.8564 25.9084M30.3564 20.4012C29.9144 18.6331 30.6447 23.1175 31.8564 25.9084M30.3564 20.4012C30.363 20.4276 30.3705 20.4551 30.3789 20.4836M30.3564 20.4012L30.3789 20.4836M31.8564 25.9084C32.0154 26.2744 32.1825 26.6113 32.3564 26.9012C33.5564 28.9012 34.5231 30.4013 34.8564 30.9014M31.8564 25.9084C32.668 24.8375 30.7391 21.7146 30.3789 20.4836M31.8564 25.9084L30.3789 20.4836M44.5 24.0004C44 25.0004 39.4826 29.5725 38.5 28.0004C36.5 24.8004 34.5 19.0004 35 17.5004C35.5004 16.5004 39.5 14.5004 39.5 14.5004M37 25.0576C37.3333 24.7243 38.8 24.2 40 23C41.2 21.8 42 20.3333 42 20M42.5 11.0576C43 11.7243 44.3 13.6576 45.5 16.0576C46.7 18.4576 48.3333 22.0576 49 23.5576M44 10.0578C45.5 8.89118 48.9 7.05784 50.5 9.05784C52.5 11.5578 54.5 15.0576 53.5 18.0576C52.7 20.4576 50 22.195 49 23.0283" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </StyledVisitedTag>
                }
            </Flex>
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

export function getVacationTypeColor(vacationType?: string) {
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
