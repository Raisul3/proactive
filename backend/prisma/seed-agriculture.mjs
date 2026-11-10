import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// NOTE: Ei data curated/approximate (BARI, BRRI, DAE, SRDI er general guidance onujayi).
// Production e jawar age official BBS/DAE data diye verify koro.
// year = 0 mane "curated regional pattern" (actual BBS production year na).
const SRC = 'Curated (BARI/BRRI/DAE/SRDI general guidance) - verify before production'
const CURATED_YEAR = 0

const SOILS = ['Clay', 'Loamy', 'Sandy', 'Silty']
const SEASONS = ['Rabi', 'Kharif-1', 'Kharif-2']

// soil ratings order: [Clay, Loamy, Sandy, Silty]
// cult: [seedRateKgPerAcre, yieldMin, yieldMax (t/acre), durationDays, waterNeed]
const CROPS = [
  { n: 'Rice (Boro)', bn: 'বোরো ধান', cat: 'cereal', seasons: ['Rabi', 'Kharif-1'], soil: [5, 4, 1, 4], cult: [16, 1.6, 2.4, 150, 'High'] },
  { n: 'Rice (Aman)', bn: 'আমন ধান', cat: 'cereal', seasons: ['Kharif-2'], soil: [5, 4, 2, 4], cult: [16, 1.2, 1.8, 125, 'High'] },
  { n: 'Rice (Aus)', bn: 'আউশ ধান', cat: 'cereal', seasons: ['Kharif-1'], soil: [3, 5, 3, 4], cult: [16, 1.0, 1.6, 105, 'Medium'] },
  { n: 'Wheat', bn: 'গম', cat: 'cereal', seasons: ['Rabi'], soil: [3, 5, 2, 4], cult: [48, 0.8, 1.2, 110, 'Low'] },
  { n: 'Maize', bn: 'ভুট্টা', cat: 'cereal', seasons: ['Rabi', 'Kharif-1'], soil: [2, 5, 3, 4], cult: [8, 2.0, 3.6, 140, 'Medium'] },
  { n: 'Potato', bn: 'আলু', cat: 'tuber', seasons: ['Rabi'], soil: [2, 5, 3, 4], cult: [900, 6, 10, 90, 'Medium'] },
  { n: 'Tomato', bn: 'টমেটো', cat: 'vegetable', seasons: ['Rabi'], soil: [2, 5, 3, 4], cult: [null, 10, 16, 120, 'Medium'] },
  { n: 'Jute', bn: 'পাট', cat: 'fiber', seasons: ['Kharif-1', 'Kharif-2'], soil: [3, 4, 2, 5], cult: [2.4, 0.8, 1.2, 120, 'Medium'] },
  { n: 'Mustard', bn: 'সরিষা', cat: 'oilseed', seasons: ['Rabi'], soil: [3, 5, 2, 4], cult: [2.5, 0.4, 0.6, 90, 'Low'] },
  { n: 'Lentil', bn: 'মসুর', cat: 'pulse', seasons: ['Rabi'], soil: [3, 4, 3, 5], cult: [16, 0.4, 0.6, 110, 'Low'] },
  { n: 'Sugarcane', bn: 'আখ', cat: 'cash crop', seasons: ['Rabi', 'Kharif-1', 'Kharif-2'], soil: [4, 5, 2, 4], cult: [null, 20, 32, 330, 'High'] },
  { n: 'Onion', bn: 'পেঁয়াজ', cat: 'vegetable', seasons: ['Rabi'], soil: [2, 5, 3, 4], cult: [null, 4, 6, 120, 'Medium'] },
  { n: 'Brinjal', bn: 'বেগুন', cat: 'vegetable', seasons: ['Rabi', 'Kharif-1', 'Kharif-2'], soil: [3, 5, 2, 4], cult: [null, 8, 14, 150, 'Medium'] },
  { n: 'Cabbage', bn: 'বাঁধাকপি', cat: 'vegetable', seasons: ['Rabi'], soil: [3, 5, 2, 4], cult: [null, 12, 20, 90, 'Medium'] },
  { n: 'Chili', bn: 'মরিচ', cat: 'spice', seasons: ['Rabi', 'Kharif-1'], soil: [2, 5, 3, 4], cult: [null, null, null, 150, 'Medium'] },
  { n: 'Sweet Potato', bn: 'মিষ্টি আলু', cat: 'tuber', seasons: ['Rabi'], soil: [1, 4, 5, 4], cult: [null, 5, 8, 120, 'Low'] },
  { n: 'Groundnut', bn: 'চীনাবাদাম', cat: 'oilseed', seasons: ['Rabi', 'Kharif-1'], soil: [1, 4, 5, 3], cult: [null, 0.6, 1.0, 120, 'Low'] },
  { n: 'Watermelon', bn: 'তরমুজ', cat: 'fruit', seasons: ['Rabi', 'Kharif-1'], soil: [1, 4, 5, 3], cult: [null, 8, 14, 90, 'Medium'] },
  { n: 'Mango', bn: 'আম', cat: 'fruit', seasons: ['Kharif-1'], soil: [2, 5, 3, 3], cult: [null, 2, 4, null, 'Low'] },
  { n: 'Banana', bn: 'কলা', cat: 'fruit', seasons: ['Rabi', 'Kharif-1', 'Kharif-2'], soil: [3, 5, 2, 4], cult: [null, 10, 16, 330, 'High'] },
  { n: 'Pineapple', bn: 'আনারস', cat: 'fruit', seasons: ['Kharif-1', 'Kharif-2'], soil: [2, 5, 3, 2], cult: [null, 8, 14, 450, 'Low'] },
  { n: 'Lychee', bn: 'লিচু', cat: 'fruit', seasons: ['Kharif-1'], soil: [2, 5, 2, 4], cult: [null, 1, 2, null, 'Medium'] },
  { n: 'Coconut', bn: 'নারকেল', cat: 'fruit', seasons: ['Rabi', 'Kharif-1', 'Kharif-2'], soil: [2, 4, 5, 3], cult: [null, null, null, null, 'Medium'] },
  { n: 'Tea', bn: 'চা', cat: 'plantation', seasons: ['Kharif-1', 'Kharif-2'], soil: [1, 5, 1, 2], cult: [null, null, null, null, 'High'] },
  { n: 'Betel Leaf', bn: 'পান', cat: 'cash crop', seasons: ['Rabi', 'Kharif-1', 'Kharif-2'], soil: [3, 5, 2, 4], cult: [null, null, null, null, 'High'] },
]

// [district, division, [soils - dominant first]]
const DISTRICTS = [
  // Dhaka
  ['Dhaka', 'Dhaka', ['Clay', 'Loamy']], ['Gazipur', 'Dhaka', ['Clay', 'Loamy']],
  ['Narayanganj', 'Dhaka', ['Loamy', 'Silty']], ['Narsingdi', 'Dhaka', ['Clay', 'Loamy']],
  ['Manikganj', 'Dhaka', ['Silty', 'Loamy']], ['Munshiganj', 'Dhaka', ['Silty', 'Loamy']],
  ['Tangail', 'Dhaka', ['Loamy', 'Clay', 'Silty']], ['Kishoreganj', 'Dhaka', ['Clay', 'Silty']],
  ['Faridpur', 'Dhaka', ['Silty', 'Loamy']], ['Gopalganj', 'Dhaka', ['Clay', 'Silty']],
  ['Madaripur', 'Dhaka', ['Silty', 'Clay']], ['Rajbari', 'Dhaka', ['Silty', 'Loamy']],
  ['Shariatpur', 'Dhaka', ['Silty', 'Sandy']],
  // Chattogram
  ['Chattogram', 'Chattogram', ['Loamy', 'Clay']], ["Cox's Bazar", 'Chattogram', ['Sandy', 'Loamy']],
  ['Cumilla', 'Chattogram', ['Loamy', 'Clay']], ['Feni', 'Chattogram', ['Silty', 'Loamy']],
  ['Noakhali', 'Chattogram', ['Silty', 'Sandy']], ['Lakshmipur', 'Chattogram', ['Silty', 'Loamy']],
  ['Chandpur', 'Chattogram', ['Silty', 'Loamy']], ['Brahmanbaria', 'Chattogram', ['Clay', 'Silty']],
  ['Bandarban', 'Chattogram', ['Loamy']], ['Rangamati', 'Chattogram', ['Loamy']],
  ['Khagrachhari', 'Chattogram', ['Loamy']],
  // Rajshahi
  ['Rajshahi', 'Rajshahi', ['Loamy', 'Silty']], ['Bogura', 'Rajshahi', ['Loamy', 'Silty']],
  ['Joypurhat', 'Rajshahi', ['Loamy', 'Clay']], ['Naogaon', 'Rajshahi', ['Loamy', 'Silty']],
  ['Natore', 'Rajshahi', ['Loamy', 'Silty']], ['Chapainawabganj', 'Rajshahi', ['Loamy', 'Sandy']],
  ['Pabna', 'Rajshahi', ['Silty', 'Loamy']], ['Sirajganj', 'Rajshahi', ['Silty', 'Sandy']],
  // Khulna
  ['Khulna', 'Khulna', ['Clay', 'Silty']], ['Bagerhat', 'Khulna', ['Clay', 'Silty']],
  ['Satkhira', 'Khulna', ['Clay', 'Silty']], ['Jashore', 'Khulna', ['Silty', 'Loamy']],
  ['Jhenaidah', 'Khulna', ['Silty', 'Loamy']], ['Magura', 'Khulna', ['Silty', 'Clay']],
  ['Narail', 'Khulna', ['Clay', 'Silty']], ['Kushtia', 'Khulna', ['Silty', 'Loamy']],
  ['Chuadanga', 'Khulna', ['Silty', 'Loamy']], ['Meherpur', 'Khulna', ['Loamy', 'Silty']],
  // Barishal
  ['Barishal', 'Barishal', ['Silty', 'Clay']], ['Bhola', 'Barishal', ['Silty', 'Sandy']],
  ['Jhalokathi', 'Barishal', ['Silty', 'Clay']], ['Patuakhali', 'Barishal', ['Silty', 'Sandy']],
  ['Pirojpur', 'Barishal', ['Clay', 'Silty']], ['Barguna', 'Barishal', ['Silty', 'Clay']],
  // Sylhet
  ['Sylhet', 'Sylhet', ['Loamy', 'Clay']], ['Moulvibazar', 'Sylhet', ['Loamy', 'Clay']],
  ['Habiganj', 'Sylhet', ['Loamy', 'Clay']], ['Sunamganj', 'Sylhet', ['Clay', 'Silty']],
  // Rangpur
  ['Rangpur', 'Rangpur', ['Loamy', 'Sandy']], ['Dinajpur', 'Rangpur', ['Loamy', 'Sandy']],
  ['Gaibandha', 'Rangpur', ['Sandy', 'Silty']], ['Kurigram', 'Rangpur', ['Sandy', 'Silty']],
  ['Lalmonirhat', 'Rangpur', ['Sandy', 'Loamy']], ['Nilphamari', 'Rangpur', ['Loamy', 'Sandy']],
  ['Panchagarh', 'Rangpur', ['Loamy', 'Sandy']], ['Thakurgaon', 'Rangpur', ['Loamy', 'Sandy']],
  // Mymensingh
  ['Mymensingh', 'Mymensingh', ['Silty', 'Clay']], ['Jamalpur', 'Mymensingh', ['Silty', 'Sandy']],
  ['Netrokona', 'Mymensingh', ['Clay', 'Silty']], ['Sherpur', 'Mymensingh', ['Loamy', 'Silty']],
]

// Division er common fosol
const DIVISION_CROPS = {
  Dhaka: ['Rice (Boro)', 'Rice (Aman)', 'Jute', 'Potato', 'Mustard', 'Brinjal'],
  Chattogram: ['Rice (Boro)', 'Rice (Aman)', 'Rice (Aus)', 'Sweet Potato', 'Cabbage', 'Tomato'],
  Rajshahi: ['Rice (Boro)', 'Rice (Aman)', 'Wheat', 'Maize', 'Potato', 'Mustard', 'Lentil'],
  Khulna: ['Rice (Boro)', 'Rice (Aman)', 'Jute', 'Mustard', 'Lentil', 'Brinjal', 'Sugarcane'],
  Barishal: ['Rice (Aman)', 'Rice (Boro)', 'Rice (Aus)', 'Brinjal', 'Chili'],
  Sylhet: ['Rice (Boro)', 'Rice (Aman)', 'Banana'],
  Rangpur: ['Rice (Aman)', 'Rice (Boro)', 'Potato', 'Maize', 'Wheat', 'Jute', 'Mustard'],
  Mymensingh: ['Rice (Boro)', 'Rice (Aman)', 'Jute', 'Mustard', 'Brinjal', 'Maize'],
}

// District-specific extra fosol
const DISTRICT_EXTRA = {
  Gazipur: ['Banana'], Narsingdi: ['Banana'], Tangail: ['Pineapple', 'Banana', 'Sugarcane'],
  Munshiganj: ['Potato'], Manikganj: ['Jute'], Faridpur: ['Jute'], Rajbari: ['Jute'],
  Bogura: ['Potato', 'Maize'], Joypurhat: ['Potato'], Naogaon: ['Mango', 'Potato'],
  Chapainawabganj: ['Mango'], Rajshahi: ['Mango'], Natore: ['Mango'],
  Kushtia: ['Sugarcane'], Chuadanga: ['Maize', 'Sugarcane'], Meherpur: ['Maize'],
  Jashore: ['Betel Leaf'], Satkhira: ['Betel Leaf'], Bagerhat: ['Betel Leaf'],
  Khulna: ['Betel Leaf'], Jhenaidah: ['Banana'],
  Pirojpur: ['Betel Leaf'], Barishal: ['Betel Leaf'],
  Barguna: ['Coconut'], Patuakhali: ['Coconut', 'Watermelon'], Bhola: ['Groundnut'],
  "Cox's Bazar": ['Watermelon', 'Groundnut', 'Chili'], Noakhali: ['Watermelon'],
  Bandarban: ['Pineapple', 'Banana', 'Mango'], Rangamati: ['Pineapple', 'Banana', 'Mango'],
  Khagrachhari: ['Pineapple', 'Banana', 'Mango'],
  Sylhet: ['Tea', 'Pineapple'], Moulvibazar: ['Tea', 'Pineapple'], Habiganj: ['Tea', 'Pineapple'],
  Dinajpur: ['Lychee'], Panchagarh: ['Tea'], Thakurgaon: ['Wheat'],
  Lalmonirhat: ['Maize'], Gaibandha: ['Maize'],
}

async function main() {
  const soilId = {}
  const seasonId = {}
  const cropId = {}

  for (const name of SOILS) {
    soilId[name] = (await prisma.soil.upsert({ where: { name }, update: {}, create: { name } })).id
  }
  for (const name of SEASONS) {
    seasonId[name] = (await prisma.season.upsert({ where: { name }, update: {}, create: { name } })).id
  }

  for (const c of CROPS) {
    const crop = await prisma.crop.upsert({
      where: { nameEn: c.n },
      update: { nameBn: c.bn, category: c.cat },
      create: { nameEn: c.n, nameBn: c.bn, category: c.cat },
    })
    cropId[c.n] = crop.id

    for (let i = 0; i < SOILS.length; i++) {
      const sId = soilId[SOILS[i]]
      await prisma.cropSoil.upsert({
        where: { cropId_soilId: { cropId: crop.id, soilId: sId } },
        update: { rating: c.soil[i], source: SRC },
        create: { cropId: crop.id, soilId: sId, rating: c.soil[i], source: SRC },
      })
    }

    for (const s of c.seasons) {
      await prisma.cropSeason.upsert({
        where: { cropId_seasonId: { cropId: crop.id, seasonId: seasonId[s] } },
        update: { source: SRC },
        create: { cropId: crop.id, seasonId: seasonId[s], source: SRC },
      })
    }

    const [seed, yMin, yMax, days, water] = c.cult
    const cult = {
      seedRateKgPerAcre: seed,
      yieldMin: yMin,
      yieldMax: yMax,
      durationDays: days,
      waterNeed: water,
      source: SRC,
    }
    await prisma.cropCultivation.upsert({
      where: { cropId: crop.id },
      update: cult,
      create: { cropId: crop.id, ...cult },
    })
  }

  for (const [nameEn, division, soils] of DISTRICTS) {
    const d = await prisma.district.upsert({
      where: { nameEn },
      update: { division },
      create: { nameEn, division },
    })

    for (const s of soils) {
      await prisma.districtSoil.upsert({
        where: { districtId_soilId: { districtId: d.id, soilId: soilId[s] } },
        update: { source: SRC },
        create: { districtId: d.id, soilId: soilId[s], source: SRC },
      })
    }

    const crops = [...new Set([...(DIVISION_CROPS[division] || []), ...(DISTRICT_EXTRA[nameEn] || [])])]
    for (const cn of crops) {
      if (!cropId[cn]) continue
      await prisma.districtCrop.upsert({
        where: { districtId_cropId_year: { districtId: d.id, cropId: cropId[cn], year: CURATED_YEAR } },
        update: { source: SRC },
        create: { districtId: d.id, cropId: cropId[cn], year: CURATED_YEAR, source: SRC },
      })
    }
  }

  console.log(`Seeded: ${DISTRICTS.length} districts, ${CROPS.length} crops`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())