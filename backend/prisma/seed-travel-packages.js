import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// The 20 static packages from the provided documentation[cite: 2]
const travelPackages = [
  {
    package_id: "TRV-001", destination: "Cox's Bazar",
    traditional_places: ["Ramu Buddhist Temple", "Adinath Temple", "Burmese Market"],
    best_visiting_areas: ["Marine Drive", "Inani Beach", "Himchari"],
    base_budget: {"1_person": 4500, "2_persons": 8000},
    transport: {"bus_non_ac": 1800, "bus_ac": 3500, "train": 1700, "plane": 9500},
    hotel: {"3_star": 2500, "4_star": 5500, "5_star": 12000}
  },
  {
    package_id: "TRV-002", destination: "Sylhet",
    traditional_places: ["Hazrat Shahjalal Mazar", "Hason Raja Museum"],
    best_visiting_areas: ["Ratargul Swamp", "Bisnakandi", "Jaflong"],
    base_budget: {"1_person": 4000, "2_persons": 7500},
    transport: {"bus_non_ac": 1200, "bus_ac": 2400, "train": 1500, "plane": 7500},
    hotel: {"3_star": 2000, "4_star": 4500, "5_star": 9000}
  },
  {
    package_id: "TRV-003", destination: "Bandarban",
    traditional_places: ["Golden Temple", "Tribal Villages", "Chimbuk Hill"],
    best_visiting_areas: ["Nilgiri", "Nafakhum", "Sangu River"],
    base_budget: {"1_person": 5500, "2_persons": 10000},
    transport: {"bus_non_ac": 1600, "bus_ac": 3000, "train": 0, "plane": 0},
    hotel: {"3_star": 2200, "4_star": 4000, "5_star": 8500}
  },
  {
    package_id: "TRV-004", destination: "Sundarbans",
    traditional_places: ["Karamjal", "Hiron Point", "Dublar Char"],
    best_visiting_areas: ["Mangrove Safari", "Kotka Beach", "Jametola"],
    base_budget: {"1_person": 8000, "2_persons": 15000},
    transport: {"bus_non_ac": 1500, "bus_ac": 2800, "train": 2000, "plane": 0},
    hotel: {"3_star": 3000, "4_star": 6000, "5_star": 15000}
  },
  {
    package_id: "TRV-005", destination: "Sajek Valley",
    traditional_places: ["Ruilui Para", "Konglak Para", "Hazachora Waterfall"],
    best_visiting_areas: ["Sajek Helipad", "Viewpoint", "Kamalak Waterfall"],
    base_budget: {"1_person": 6000, "2_persons": 11000},
    transport: {"bus_non_ac": 2000, "bus_ac": 3500, "train": 0, "plane": 0},
    hotel: {"3_star": 2500, "4_star": 5000, "5_star": 10000}
  },
  {
    package_id: "TRV-006", destination: "Saint Martin's Island",
    traditional_places: ["Chera Dwip", "Local Fishery Market", "Lighthouse"],
    best_visiting_areas: ["West Beach", "Coral Reefs", "Marine Park"],
    base_budget: {"1_person": 6500, "2_persons": 12000},
    transport: {"bus_non_ac": 3000, "bus_ac": 5000, "train": 0, "plane": 0},
    hotel: {"3_star": 3000, "4_star": 6000, "5_star": 12000}
  },
  {
    package_id: "TRV-007", destination: "Kuakata",
    traditional_places: ["Misripara Buddhist Temple", "Fatrar Char", "Rakhine Market"],
    best_visiting_areas: ["Kuakata Beach", "Gangamati Forest", "Red Crab Beach"],
    base_budget: {"1_person": 4000, "2_persons": 7000},
    transport: {"bus_non_ac": 1600, "bus_ac": 2800, "train": 0, "plane": 0},
    hotel: {"3_star": 2000, "4_star": 4000, "5_star": 8000}
  },
  {
    package_id: "TRV-008", destination: "Sreemangal",
    traditional_places: ["Tea Museum", "Manipuri Village", "Nilkantha Tea Cabin"],
    best_visiting_areas: ["Lawachara Forest", "Madhabpur Lake", "Baikka Beel"],
    base_budget: {"1_person": 3500, "2_persons": 6000},
    transport: {"bus_non_ac": 1000, "bus_ac": 1600, "train": 1200, "plane": 0},
    hotel: {"3_star": 2000, "4_star": 5000, "5_star": 15000}
  },
  {
    package_id: "TRV-009", destination: "Tanguar Haor, Sunamganj",
    traditional_places: ["Hason Raja House", "Tekerghat", "Jadu Kata River"],
    best_visiting_areas: ["Tanguar Haor Watchtower", "Shimul Bagan", "Niladri Lake"],
    base_budget: {"1_person": 5000, "2_persons": 9000},
    transport: {"bus_non_ac": 1200, "bus_ac": 2200, "train": 0, "plane": 0},
    hotel: {"3_star": 2000, "4_star": 4000, "5_star": 8000}
  },
  {
    package_id: "TRV-010", destination: "Khagrachari",
    traditional_places: ["Alutila Cave", "Tareq Miah's Hanging Bridge", "New Zealand Para"],
    best_visiting_areas: ["Sajek Transit", "Richhang Waterfall", "Horticulture Park"],
    base_budget: {"1_person": 4000, "2_persons": 7500},
    transport: {"bus_non_ac": 1400, "bus_ac": 2600, "train": 0, "plane": 0},
    hotel: {"3_star": 1500, "4_star": 3500, "5_star": 7000}
  },
  {
    package_id: "TRV-011", destination: "Bogura",
    traditional_places: ["Mahasthangarh", "Behula Lakshindar Bashor Ghor", "Nawab Palace"],
    best_visiting_areas: ["Gokul Medh", "Vasu Vihara", "Saurashtra"],
    base_budget: {"1_person": 3000, "2_persons": 5500},
    transport: {"bus_non_ac": 1000, "bus_ac": 1800, "train": 1200, "plane": 0},
    hotel: {"3_star": 2000, "4_star": 4500, "5_star": 10000}
  },
  {
    package_id: "TRV-012", destination: "Rajshahi",
    traditional_places: ["Puthia Temple Complex", "Varendra Museum", "Bagha Mosque"],
    best_visiting_areas: ["Padma River Bank", "Sardah Police Academy", "Rajshahi University"],
    base_budget: {"1_person": 3500, "2_persons": 6500},
    transport: {"bus_non_ac": 1200, "bus_ac": 2200, "train": 1400, "plane": 7000},
    hotel: {"3_star": 2000, "4_star": 4000, "5_star": 8000}
  },
  {
    package_id: "TRV-013", destination: "Cumilla",
    traditional_places: ["Shalban Vihara", "Mainamati War Cemetery", "Rani Mainamati Palace"],
    best_visiting_areas: ["Dharmasagar Dighi", "Rupban Mura", "BARD Campus"],
    base_budget: {"1_person": 2000, "2_persons": 3500},
    transport: {"bus_non_ac": 500, "bus_ac": 1000, "train": 800, "plane": 0},
    hotel: {"3_star": 1500, "4_star": 3000, "5_star": 6000}
  },
  {
    package_id: "TRV-014", destination: "Barishal",
    traditional_places: ["Guthia Mosque", "Durga Sagar", "Oxford Mission Church"],
    best_visiting_areas: ["Floating Guava Market", "Kuakata Transit", "Kirtonkhola River"],
    base_budget: {"1_person": 3000, "2_persons": 5500},
    transport: {"bus_non_ac": 1200, "bus_ac": 2000, "train": 0, "plane": 7000},
    hotel: {"3_star": 1500, "4_star": 3500, "5_star": 8000}
  },
  {
    package_id: "TRV-015", destination: "Dinajpur",
    traditional_places: ["Kantajew Temple", "Nayabad Mosque", "Dinajpur Rajbari"],
    best_visiting_areas: ["Ramsagar National Park", "Shopnopuri", "Litchi Orchards"],
    base_budget: {"1_person": 3500, "2_persons": 6000},
    transport: {"bus_non_ac": 1500, "bus_ac": 2500, "train": 1800, "plane": 0},
    hotel: {"3_star": 1500, "4_star": 3000, "5_star": 6000}
  },
  {
    package_id: "TRV-016", destination: "Sitakunda",
    traditional_places: ["Chandranath Temple", "Bhavani Temple", "Sitakunda Botanical Garden"],
    best_visiting_areas: ["Guliakhali Beach", "Bawachara", "Kumira Sandwip Ghat"],
    base_budget: {"1_person": 3000, "2_persons": 5500},
    transport: {"bus_non_ac": 1200, "bus_ac": 2400, "train": 1400, "plane": 8500},
    hotel: {"3_star": 1500, "4_star": 3500, "5_star": 0}
  },
  {
    package_id: "TRV-017", destination: "Bagerhat",
    traditional_places: ["Sixty Dome Mosque", "Shrine of Khan Jahan Ali", "Nine Dome Mosque"],
    best_visiting_areas: ["Chandra Mahal Eco Park", "Sundarbans Transit", "Bagerhat Museum"],
    base_budget: {"1_person": 3000, "2_persons": 5500},
    transport: {"bus_non_ac": 1000, "bus_ac": 2000, "train": 0, "plane": 0},
    hotel: {"3_star": 1500, "4_star": 3000, "5_star": 0}
  },
  {
    package_id: "TRV-018", destination: "Paharpur (Naogaon)",
    traditional_places: ["Somapura Mahavihara", "Satyapir Vita", "Kusumba Mosque"],
    best_visiting_areas: ["Paharpur Museum", "Altadighi National Park", "Dibar Dighi"],
    base_budget: {"1_person": 3500, "2_persons": 6000},
    transport: {"bus_non_ac": 1200, "bus_ac": 2200, "train": 1500, "plane": 0},
    hotel: {"3_star": 1500, "4_star": 3000, "5_star": 0}
  },
  {
    package_id: "TRV-019", destination: "Birishiri (Netrokona)",
    traditional_places: ["Garo Village", "Tribal Cultural Academy", "Ranikhong Mission"],
    best_visiting_areas: ["Someswari River", "Bijoypur White Clay Hill", "China Mati Pahar"],
    base_budget: {"1_person": 3000, "2_persons": 5000},
    transport: {"bus_non_ac": 800, "bus_ac": 1500, "train": 1000, "plane": 0},
    hotel: {"3_star": 1500, "4_star": 3000, "5_star": 0}
  },
  {
    package_id: "TRV-020", destination: "Nijhum Dwip",
    traditional_places: ["Hatiya Island", "Local Fishing Village", "Komla Bazar"],
    best_visiting_areas: ["Deer Watching Point", "Namabazar Beach", "Mangrove Forest"],
    base_budget: {"1_person": 4500, "2_persons": 8000},
    transport: {"bus_non_ac": 2000, "bus_ac": 3500, "train": 0, "plane": 0},
    hotel: {"3_star": 2000, "4_star": 0, "5_star": 0}
  }
];

async function main() {
  console.log('Seeding travel packages...');
  
  for (const pkg of travelPackages) {
    await prisma.travelPackage.upsert({
      where: { packageId: pkg.package_id },
      update: {},
      create: {
        packageId: pkg.package_id,
        destination: pkg.destination,
        traditionalPlaces: pkg.traditional_places,
        bestVisitingAreas: pkg.best_visiting_areas,
        baseBudget: pkg.base_budget,
        transport: pkg.transport,
        hotel: pkg.hotel,
        isVerified: false,
        source: 'Internal estimate (unverified)',
      },
    });
  }
  
  console.log('Successfully seeded 20 base travel packages!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });