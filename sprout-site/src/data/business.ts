export interface Service {
  name: string;
  description: string;
  minutes: number;
  price: number;
  category: 'common' | 'chemical';
}
export const business: {
  name: string;
  bookingUrl: string;
  whatsappNumber: string;
  address: string;
  directions: string;
  mapsUrl: string;
  rating: string;
  reviews: number;
  barber: string;
  hours: { days: string; hours: string }[];
} = {
  name: 'Sprout BarberShop',
  whatsappNumber: '5511910789925',
  bookingUrl:
    'https://www.fresha.com/pt/a/sprout-barbershop-sao-paulo-avenida-cesario-de-abreu-450-pz04wr3u',
  address: 'Avenida Cesário de Abreu, 450 — Centro, São Paulo',
  directions:
    'Subindo a rua da Igreja Universal na rotatória, do lado direito da rua, ao lado da autoescola.',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Avenida%20Ces%C3%A1rio%20de%20Abreu%20450%20S%C3%A3o%20Paulo',
  rating: '5,0',
  reviews: 65,
  barber: 'Luan',
  hours: [
    { days: 'Segunda a quinta', hours: '09:30 – 20:30' },
    { days: 'Sexta e sábado', hours: '09:30 – 21:30' },
    { days: 'Domingo', hours: 'Fechado' },
  ],
};
export const services: readonly Service[] = [
  {
    name: 'Corte',
    description: 'Corte com lavagem.',
    minutes: 40,
    price: 45,
    category: 'common',
  },
  {
    name: 'Barba',
    description: 'Barba desenhada completa.',
    minutes: 20,
    price: 30,
    category: 'common',
  },
  {
    name: 'Cavanhaque',
    description: 'Bigode e cavanhaque desenhados.',
    minutes: 10,
    price: 10,
    category: 'common',
  },
  {
    name: 'Sobrancelha',
    description: '',
    minutes: 5,
    price: 10,
    category: 'common',
  },
  {
    name: 'Máscara negra',
    description: 'Cuidado com máscara negra e toalha quente.',
    minutes: 20,
    price: 15,
    category: 'common',
  },
  {
    name: 'Botox',
    description: 'Para abrir os cachos ou alisar.',
    minutes: 70,
    price: 80,
    category: 'chemical',
  },
  {
    name: 'Hidratação / finalização',
    description: 'Hidratação profissional.',
    minutes: 25,
    price: 25,
    category: 'chemical',
  },
  {
    name: 'Luzes',
    description: '',
    minutes: 135,
    price: 80,
    category: 'chemical',
  },
];
if (business.bookingUrl && new URL(business.bookingUrl).protocol !== 'https:')
  throw new Error('O link de agendamento deve usar HTTPS.');
