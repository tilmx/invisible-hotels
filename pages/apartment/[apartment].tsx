import hotels from '../../data/hotels.json';
import { HotelDetailPage } from '../../components/hotel-detail-page';

export default function Hotel({ hotel }: { hotel: typeof hotels[number] }) {
    return (
        <HotelDetailPage hotel={hotel} />
    )
}

export async function getStaticProps({ params }: { params: { apartment: string } }) {
    return { props: { hotel: hotels.find(hotel => hotel.id === params.apartment) } }
}

export async function getStaticPaths() {
    return { paths: hotels.filter(hotel => hotel.housingType === 'Apartment').map((apartment) => { return { params: { apartment: apartment.id } } }), fallback: false }
}
