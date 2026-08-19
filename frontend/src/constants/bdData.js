// Publicly available Bangladesh reference data — not user-specific, so it's
// safe to ship as static constants rather than round-tripping to the AI.
// Sourced from official government portals; verified via web search.

export const BD_DISTRICTS = [
  'Bagerhat', 'Bandarban', 'Barguna', 'Barisal', 'Bhola', 'Bogra', 'Brahmanbaria',
  'Chandpur', 'Chapainawabganj', 'Chittagong', 'Chuadanga', 'Comilla', "Cox's Bazar",
  'Dhaka', 'Dinajpur', 'Faridpur', 'Feni', 'Gaibandha', 'Gazipur', 'Gopalganj',
  'Habiganj', 'Jamalpur', 'Jessore', 'Jhalokati', 'Jhenaidah', 'Joypurhat',
  'Khagrachhari', 'Khulna', 'Kishoreganj', 'Kurigram', 'Kushtia', 'Lakshmipur',
  'Lalmonirhat', 'Madaripur', 'Magura', 'Manikganj', 'Meherpur', 'Moulvibazar',
  'Munshiganj', 'Mymensingh', 'Naogaon', 'Narail', 'Narayanganj', 'Narsingdi',
  'Natore', 'Netrokona', 'Nilphamari', 'Noakhali', 'Pabna', 'Panchagarh',
  'Patuakhali', 'Pirojpur', 'Rajbari', 'Rajshahi', 'Rangamati', 'Rangpur',
  'Satkhira', 'Shariatpur', 'Sherpur', 'Sirajganj', 'Sunamganj', 'Sylhet',
  'Tangail', 'Thakurgaon',
]

export const RIDESHARE_APPS = [
  { name: 'Uber Bangladesh', url: 'https://www.uber.com/bd/en/', icon: '🚗' },
  { name: 'Pathao', url: 'https://pathao.com/bd/', icon: '🏍️' },
  { name: 'Shohoz', url: 'https://www.shohoz.com/', icon: '🚕' },
  { name: 'Obhai', url: 'https://obhai.app/', icon: '🛵' },
]

// Official Bangladesh government service portals — verified current URLs.
export const GOV_SERVICE_LINKS = [
  { name: 'National ID (NID)', url: 'https://services.nidw.gov.bd', note: 'Apply / check NID status' },
  { name: 'e-Passport', url: 'https://www.epassport.gov.bd', note: 'Apply for a new or renewed passport' },
  { name: 'Driving License (BRTA)', url: 'https://brta.gov.bd', note: 'License, registration & fitness services' },
  { name: 'Land Records (e-Porcha)', url: 'https://www.land.gov.bd', note: 'Khatian / porcha & land services' },
  { name: 'Income Tax e-Filing (NBR)', url: 'https://etaxnbr.gov.bd', note: 'TIN & online tax return filing' },
  { name: 'Birth/Death Registration', url: 'https://bdris.gov.bd', note: 'Birth & death certificate registration' },
  { name: 'Bangladesh Railway e-Ticket', url: 'https://eticket.railway.gov.bd', note: 'Book train tickets online' },
]

export const EMERGENCY_CONTACTS = [
  { name: 'National Emergency Service (Police / Fire / Ambulance)', number: '999', category: 'emergency' },
  { name: 'Fire Service & Civil Defence', number: '199', category: 'emergency' },
  { name: 'National Helpline (Government Info Service)', number: '333', category: 'government' },
  { name: 'Violence Against Women & Children Helpline', number: '109', category: 'social' },
  { name: 'Child Helpline', number: '1098', category: 'social' },
  { name: 'Anti-Corruption Helpline', number: '106', category: 'government' },
  { name: 'Health Batayon (Health advice)', number: '16263', category: 'health' },
]
