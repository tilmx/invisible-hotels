import styled from '@emotion/styled';
import { FunctionComponent, MouseEventHandler } from 'react';
import { Breakpoint, Color, Size } from './tokens';
import { Text, TextSize } from './text';
import { getVacationTypeColor, getVacationTypeIcon } from '../utils';
import { Tag } from './tag';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { AlignItems, Flex, JustifyContent } from './utils';

interface HotelCardProps {
    title: string;
    location: string;
    housingType: string;
    vacationType: string;
    visited?: boolean;
    image?: {
        url: string;
        width: number;
        height: number;
    };
    links?: {
        bookingCom?: string;
        hotel?: string;
    };
    starred: boolean;
    onStarClick?: MouseEventHandler;
}

const StyledCard = styled.a<{ color?: string; }>`
    color: ${Color.TextAlways}; 
    text-decoration: none;
    background: ${props => props.color};
    padding: ${Size.XXS};
    border-radius: ${Size.M};
    min-height: 400px;
    display: flex;
    flex-direction: column;
    gap: ${Size.XXXS};
    transition: transform .2s, box-shadow .2s;
    transform: translate3d(0,0,0);
    overflow: hidden;

    @media (hover: hover) {
        :hover {
            transform: scale(1.03);
            box-shadow: 0 ${Size.S} ${Size.XXXL} ${Color.Shadow}, 0 ${Size.XXXS} ${Size.S} ${Color.Shadow};
            [data-stararea] {
                visibility: visible;
            } 
        }
    }

    :active {
        :after {
            content: '';
            position: absolute;
            display: block;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            background: ${Color.TextAlways};
            opacity: .1;
            pointer-events: none;
        }
    }

    ${Breakpoint.TabletSmall} {
        min-height: 280px;
    }
`;

const StyledHeader = styled.div`
    flex: 1;
    position: relative;
`;

const StyledContent = styled.div<{ image: boolean }>`
    border-radius: ${Size.S};
    padding: ${Size.XS} ${Size.S};
    color: ${props => props.image && Color.BackgroundAlways};
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: ${Size.XXS};
    z-index: 1;
    position: relative;
    word-break: break-word;

    ${Breakpoint.Mobile} {
        gap: ${Size.XXXS};
    }
`;

const StyledDetails = styled.div`
    display: flex;
    align-items: flex-end;
    padding: ${Size.XS} ${Size.S};
    gap: ${Size.XXS};
`;

const StyledTagList = styled.div`
    display: flex;
    gap: ${Size.XXS};
    flex-wrap: wrap;
    align-items: stretch;
`;

const StyledVisitedTag = styled.svg`
    display: block;
    margin-left: auto;
    height: 44px;
    width: auto;

    ${Breakpoint.Mobile} {
        height: 35px;
    }
`;

const StyledImageContainer = styled.div`
    border-radius: ${Size.S};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    backgroud: ${Color.Shadow};

    &:after {
        content: '';
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 50%;
        background: linear-gradient(${Color.TextAlways} 30%, transparent);
        opacity: .5;
    }
`;

const StyledStarArea = styled.div<{ starred: boolean; }>`
    padding: ${Size.XS};
    margin-top: -${Size.XXS};
    margin-right: -${Size.XS};
    border-radius: 50%;
    @media (hover: hover) {
       visibility: ${props => props.starred ? 'visible' : 'hidden'};
       :hover {
            background: ${Color.Text10};
            backdrop-filter: blur(${Size.XXS});
        }
    }
    :active {
        background: ${Color.Text20};
        backdrop-filter: blur(${Size.XXS});
    }
    svg {
        display: block;
        ${props => props.starred && `fill: currentColor`};
    }    
`;


export const HotelCard: FunctionComponent<HotelCardProps> = props => {
    return (
        <StyledCard href={props.links?.bookingCom || props.links?.hotel} color={getVacationTypeColor(props.vacationType)} target="_blank">
            <StyledHeader>
                <StyledContent image={typeof props.image !== 'undefined'}>
                    <Flex justifyContent={JustifyContent.SpaceBetween} alignItems={AlignItems.FlexStart}>
                        <Text size={TextSize.SuperLarge} bold>
                            {props.title}
                        </Text>
                        <StyledStarArea data-stararea starred={props.starred} onClick={props.onStarClick}>
                            <Star />
                        </StyledStarArea>
                    </Flex>
                    <Text size={TextSize.Large} serif>
                        {props.location}
                    </Text>
                </StyledContent>
                {props.image &&
                    <StyledImageContainer>
                        <div style={{ position: 'relative', height: '100%' }}>
                            <Image fill sizes="400px" src={'/images/hotels/' + props.image.url} alt="Picture of Hotel" style={{ objectFit: 'cover' }} />
                        </div>
                    </StyledImageContainer>
                }
            </StyledHeader>
            <StyledDetails>
                <StyledTagList>
                    <Tag icon={getVacationTypeIcon(props.vacationType)} label={props.vacationType} />
                    <Tag label={props.housingType} />
                </StyledTagList>
                {props.visited &&
                    <StyledVisitedTag width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 6.31332C0.206021 6.64418 0.314825 6.55314 0.562051 7.0418C0.871083 7.65262 1.41189 8.95061 1.79818 8.95061C2.18447 8.95061 1.88124 6.67408 2.19028 6.67408C2.49931 6.67408 4.73398 7.95803 4.73398 7.57626C4.73398 7.35774 4.07635 6.69487 3.83298 5.97333C3.46794 4.89103 3.71653 5.14692 3.65046 4.68986M10.9649 0C9.85756 0.585369 5.18595 3.36027 5.12414 3.78785C5.04689 4.32231 5.3163 4.61945 5.54808 5.30662C5.77985 5.99379 5.73462 6.72266 6.58446 6.4936C7.26433 6.31036 12.2192 2.83057 12.4252 2.52516M5.67176 5.23077C6.63845 4.88719 8.59212 3.78771 10.4174 2.34464M5.4296 16.244C5.30083 16.2186 5.05876 16.2288 5.12056 16.4731C5.19782 16.7785 8.28046 20.5122 8.97578 21.2757M9.50663 18.7236C8.91432 19.1308 7.63699 20.0369 7.26615 20.4034L6.57083 21.0905M8.04883 16.6943C8.7184 17.4833 11.555 20.6305 11.864 21.3635M11.3214 13.7092C10.7033 13.8873 9.55288 14.78 9.49107 15.513C9.41382 16.4292 10.5965 17.4456 11.0601 17.9801C11.5236 18.5145 11.9872 19.049 12.837 18.5145C13.5169 18.087 13.5838 17.7256 13.5323 17.5983M11.249 17.6534C11.7126 17.348 12.7015 16.6608 12.9487 16.3554M15.0225 17.7141C14.765 17.1032 14.1726 15.7442 13.8636 15.1944C13.4773 14.5073 12.7047 13.9728 12.782 13.6674C12.8593 13.362 14.1727 12.064 14.4817 12.293C14.6295 12.4026 15.1226 13.5357 15.0221 14.269C14.9545 14.7624 14.3224 14.8362 14.2499 15.1944L17.8811 15.6526M21.3612 12.9668C21.3097 13.1959 20.8784 13.2816 20.6312 13.7092C20.3221 14.2436 18.2446 14.9308 17.1629 13.7092C15.6609 12.0126 19.1312 9.72957 20.2893 9.01918M20.2661 11.8845L17.5853 13.7531M12.3847 23.9786C12.0224 24.0233 11.3976 24.0277 11.7961 23.6876C12.2942 23.2626 16.5738 19.2807 19.8115 17.2452C22.4016 15.6167 23.6378 15.0158 23.9322 14.9189L24 15.4559M1.92618 12.3995C1.28757 12.8607 0.186482 13.8896 0.891037 14.3156C1.77173 14.8483 3.19125 14.5105 3.6316 14.7768C4.07195 15.0431 3.66138 16.4396 3.03691 16.9592C2.41243 17.4789 1.43973 17.3392 1.49559 16.0272M6.3359 15.0862C5.56913 15.465 3.89718 11.2314 3.78058 10.9167M2.68544 11.6529C4.25978 10.097 5.41569 9.48901 5.24076 9.83476M7.97861 13.7092C7.61356 13.8895 7.43104 11.9053 7.24851 11.1838L6.70094 9.01918C7.24851 9.50021 8.48967 10.5344 9.07374 10.823C9.65782 11.1116 10.2906 11.304 10.5339 11.3642M5.97085 12.2661C6.57926 11.9053 7.86909 11.0756 8.16113 10.6426M8.52617 8.0609C8.58702 8.42166 8.56268 8.65884 9.43879 8.80315C9.8945 8.87821 11.048 9.26788 11.264 8.98615M10.7164 6.99931C10.5551 6.36143 10.8217 7.97926 11.264 8.98615M10.7164 6.99931C10.7189 7.00884 10.7216 7.01875 10.7246 7.02903M10.7164 6.99931L10.7246 7.02903M11.264 8.98615C11.322 9.1182 11.3831 9.23973 11.4465 9.3443C11.8846 10.0658 12.2375 10.607 12.3592 10.7874M11.264 8.98615C11.5603 8.59979 10.8561 7.47314 10.7246 7.02903M11.264 8.98615L10.7246 7.02903M15.8795 8.29779C15.697 8.65856 14.0479 10.308 13.6892 9.74086C12.9591 8.58641 12.229 6.49395 12.4116 5.9528C12.5942 5.59204 14.0543 4.8705 14.0543 4.8705M13.1417 8.6792C13.2633 8.55895 13.7987 8.3698 14.2368 7.93688C14.6748 7.50396 14.9669 6.97484 14.9669 6.85458M15.1494 3.62846C15.3319 3.86897 15.8065 4.56646 16.2445 5.4323C16.6826 6.29814 17.2788 7.5969 17.5222 8.13805M15.697 3.26777C16.2445 2.84688 17.4857 2.18547 18.0698 2.90701C18.7999 3.80893 19.53 5.07153 19.1649 6.15383C18.8729 7.01967 17.8872 7.64646 17.5222 7.9471" stroke="black" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
                    </StyledVisitedTag>
                }
            </StyledDetails>
        </StyledCard>
    )
}
