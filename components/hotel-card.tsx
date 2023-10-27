import styled from '@emotion/styled';
import { FunctionComponent, MouseEventHandler } from 'react';
import { Breakpoint, Color, Size } from './tokens';
import { Text, TextSize } from './text';
import { getVacationTypeColor, getVacationTypeIcon } from '../utils';
import { Tag } from './tag';
import Image from 'next/image';

interface HotelCardProps {
    title: string;
    location: string;
    housingType: string;
    vacationType: string;
    visited?: boolean;
    image?: string;
    links?: {
        bookingCom?: string;
        hotel?: string;
    };
    starred: boolean;
    onStarClick?: MouseEventHandler;
}

const StyledCard = styled.a<{ color?: string; }>`
    color: inherit;
    text-decoration: none;
    background: ${props => props.color};
    padding: ${Size.XXS};
    border-radius: ${Size.M};
    min-height: 360px;
    display: flex;
    flex-direction: column;
    gap: ${Size.XXXS};

    ${Breakpoint.TabletSmall} {
        min-height: 280px;
    }
`;

const StyledHeader = styled.div`
    flex: 1;
    position: relative;
`;

const StyledContent = styled.div<{ onImage: boolean; }>`
    border-radius: ${Size.S};
    padding: ${Size.XS} ${Size.S};
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: ${Size.XXS};
    z-index: 1;
    position: relative;
    ${props => props.onImage && `color: ${Color.Background};`}
`;

const StyledTagList = styled.div`
    display: flex;
    gap: ${Size.XXS};
    padding: ${Size.XS} ${Size.S};
    flex-wrap: wrap;
`;

const StyledImageContainer = styled.div`
    border-radius: ${Size.S};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;

    &:after {
        content: '';
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        width: 100%;
        height: 50%;
        background: linear-gradient(${Color.Text50}, transparent);
    }
`;

const StyledImage = styled(Image)`
    border-radius: ${Size.S};
`;

export const HotelCard: FunctionComponent<HotelCardProps> = props => {
    return (
        <StyledCard href={props.links?.bookingCom || props.links?.hotel} color={getVacationTypeColor(props.vacationType)} target="_blank">
            <StyledHeader>
                <StyledContent onImage={typeof props.image !== 'undefined'}>
                    <Text size={TextSize.Large} bold>
                        {props.title}
                    </Text>
                    <Text serif>
                        {props.location}
                    </Text>
                </StyledContent>
                {props.image &&
                    <StyledImageContainer>
                        <StyledImage fill src={props.image} alt="Picture of Hotel" />
                    </StyledImageContainer>
                }
            </StyledHeader>
            <StyledTagList>
                <Tag icon={getVacationTypeIcon(props.vacationType)} label={props.vacationType} />
                <Tag label={props.housingType} />
            </StyledTagList>
        </StyledCard>
    )
}

/*
            
*/
