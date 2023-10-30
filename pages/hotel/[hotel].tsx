import Image from 'next/image';
import { Header } from '../../components/header';
import { Text, TextSize } from '../../components/text';
import hotels from '../../data/hotels.json';
import styled from '@emotion/styled';
import { Flex, FlexDirection, JustifyContent } from '../../components/utils';
import { Tag } from '../../components/tag';
import { Size } from '../../components/tokens';

const StyledImage = styled(Image)`
    display: block;
    margin: 0;
    padding: 0;
    border: none;
    border-radius: ${Size.M};
    margin: 0 auto;
`

export default function Hotel({ hotel }: { hotel: typeof hotels[number] }) {
    return (
        <Header>
            <Flex direction={FlexDirection.Column} gap={Size.M}>
                <Text size={TextSize.Huge} bold center>{hotel.name}</Text>
                <Text size={TextSize.SuperLarge} center serif>{hotel.city}, {hotel.country}</Text>
                <Flex justifyContent={JustifyContent.Center} gap={Size.XXS}>
                    <Tag label={hotel.vacationType} />
                    <Tag label={hotel.housingType} />
                </Flex>
                {hotel.images?.map((image, i) =>
                    <StyledImage key={i} src={'/images/hotels/' + image.url} alt="Image of Hotel" width={720} height={720} />
                )}
            </Flex>
        </Header>
    )
}

export async function getStaticProps({ params }: { params: { hotel: string } }) {
    const hotel = hotels.find(hotel => hotel.id === params.hotel)
    return {
        props: {
            hotel: hotel,
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: hotels.map((hotel) => {
            return {
                params: {
                    hotel: hotel.id,
                },
            }
        }),
        fallback: false,
    }
}