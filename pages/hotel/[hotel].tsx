import hotels from '../../data/hotels.json';
import { HotelDetailPage } from '../../components/hotel-detail-page';

export default function Hotel({ hotel }: { hotel: typeof hotels[number] }) {
    return (
        <HotelDetailPage hotel={hotel} />
    )
}

export async function getStaticProps({ params }: { params: { hotel: string } }) {
    return { props: { hotel: hotels.find(hotel => hotel.id === params.hotel) } }
}

export async function getStaticPaths() {
    return { paths: hotels.filter(hotel => hotel.housingType === 'Hotel').map((hotel) => { return { params: { hotel: hotel.id } } }), fallback: false }
}
