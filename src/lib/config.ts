export const SITE = {
  name: 'Calico Taco',
  tagline: 'Street tacos. Real flavor. Find us around town.',
  url: 'https://calicotaco.com',
  email: 'hello@calicotaco.com',
  phone: '(864) 555-8274',
  instagram: '@calicotaco',
} as const

export const MENU = [
  { name: 'Al Pastor', price: '$4', description: 'Marinated pork, pineapple, cilantro, onion. Our #1.', category: 'Tacos', spicy: false },
  { name: 'Birria', price: '$5', description: 'Slow-braised beef, consommé for dipping, melted cheese, onion, cilantro.', category: 'Tacos', spicy: false },
  { name: 'Pollo Asado', price: '$4', description: 'Grilled chicken, avocado crema, pickled onion, cotija.', category: 'Tacos', spicy: false },
  { name: 'Carnitas', price: '$4', description: 'Crispy pork, salsa verde, radish, lime.', category: 'Tacos', spicy: false },
  { name: 'El Diablo', price: '$5', description: 'Chorizo, habanero salsa, ghost pepper crema, pickled jalapeño.', category: 'Tacos', spicy: true },
  { name: 'Elote Bowl', price: '$8', description: 'Street corn off the cob, mayo, cotija, tajín, lime, cilantro.', category: 'Sides', spicy: false },
  { name: 'Loaded Nachos', price: '$10', description: 'Choose your protein. Cheese, pico, guac, sour cream, jalapeños.', category: 'Sides', spicy: false },
  { name: 'Churro Bites', price: '$5', description: 'Warm churro pieces, cinnamon sugar, chocolate sauce.', category: 'Dessert', spicy: false },
  { name: 'Horchata', price: '$4', description: 'House-made rice milk, cinnamon, vanilla. Ice cold.', category: 'Drinks', spicy: false },
  { name: 'Jarritos', price: '$3', description: 'Mexican soda — tamarind, mango, lime, or grapefruit.', category: 'Drinks', spicy: false },
]

export const SCHEDULE = [
  { day: 'Monday', location: 'Riverside Trail — near University', time: '11am – 2pm' },
  { day: 'Tuesday', location: 'Tech Campus — Main Building', time: '11am – 2pm' },
  { day: 'Wednesday', location: 'Central Park', time: '11:30am – 2pm' },
  { day: 'Thursday', location: 'Bridge District', time: '11am – 2pm' },
  { day: 'Friday', location: 'West Village Arts District', time: '5pm – 9pm' },
  { day: 'Saturday', location: 'Saturday Farmers Market, downtown', time: '9am – 1pm' },
  { day: 'Sunday', location: 'Trailside Park', time: '12pm – 4pm' },
]

export const DELIVERY = [
  { name: 'Uber Eats', url: '#', color: '#06C167' },
  { name: 'DoorDash', url: '#', color: '#FF3008' },
  { name: 'Grubhub', url: '#', color: '#F63440' },
]

export const CATERING = {
  minGuests: 20,
  pricePerPerson: '$12-$18',
  includes: 'Taco bar setup, 3 proteins, rice, beans, toppings, tortillas, drinks. Setup and cleanup included.',
}
