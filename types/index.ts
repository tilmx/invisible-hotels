import hotels from '../data/hotels.json';
import hotelsPreview from '../data/hotels-preview.json';

export type Hotel = typeof hotels[number];
export type HotelPreview = typeof hotelsPreview[number];
export type NearbyHotelPreview = typeof hotels[number]["nearby"][number];
