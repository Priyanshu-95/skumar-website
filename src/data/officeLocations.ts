import type { OfficeLocation } from '../types';

export const OFFICIAL_CONTACT = {
  brand: 'SKumar Construction & Interior',
  phone: '+91 98989 66648',
  telLink: 'tel:+919898966648',
  whatsappNumber: '919898966648',
  whatsappUrl: 'https://wa.me/919898966648',
  office: '414, Antilia Business Hub',
  road: 'S.P. Ring Road',
  area: 'Nana Chiloda Circle',
  city: 'Ahmedabad',
  state: 'Gujarat',
  country: 'India',
  pincode: '382330',
  fullAddress: '414, Antilia Business Hub, S.P. Ring Road, Nana Chiloda Circle, Ahmedabad, Gujarat 382330',
  shortAddress: 'Nana Chiloda Circle, Ahmedabad',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Antilia+Business+Hub,+Nana+Chiloda+Circle,+Ahmedabad,+Gujarat+382330',
  mapIframeUrl: 'https://maps.google.com/maps?q=Antilia+Business+Hub,+Nana+Chiloda+Circle,+Ahmedabad,+Gujarat+382330&t=&z=16&ie=UTF8&iwloc=&output=embed'
};

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    city: 'Ahmedabad',
    title: 'SKumar Construction & Interior Studio',
    address: OFFICIAL_CONTACT.fullAddress,
    landmark: 'Nana Chiloda Circle, S.P. Ring Road',
    phone: OFFICIAL_CONTACT.phone,
    email: 'info@skumarinterior.com',
    whatsapp: OFFICIAL_CONTACT.whatsappNumber,
    hours: 'Mon – Sat: 10:00 AM – 7:30 PM',
    mapIframeUrl: OFFICIAL_CONTACT.mapIframeUrl,
    directionsUrl: OFFICIAL_CONTACT.directionsUrl
  }
];
