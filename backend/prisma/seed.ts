// backend/prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const medicines = [
  {
    name: "Nepro A Plus Tablet",
    strength: "500 mg",
    indication: "Pain Relief",
    company: "ACME Pharmaceuticals Ltd.",
    standardDosage: "1-0-1 (Morning & Night, after meal)",
    mildDosage: "1-0-0 (Once daily)",
    severeDosage: "1-1-1 (Three times daily max)"
  },
  {
    name: "Rolip Capsule",
    strength: "20 mg / 40 mg",
    indication: "Heart Disease / Cholesterol",
    company: "Renata PLC",
    standardDosage: "0-0-1 (At Night, after meal)",
    mildDosage: "20 mg (0-0-1)",
    severeDosage: "40 mg (0-0-1)"
  },
  {
    name: "Myolax Tablet",
    strength: "50 mg",
    indication: "Muscle Pain & Spasm",
    company: "Incepta Pharmaceuticals Ltd.",
    standardDosage: "1-0-1 (Morning & Night)",
    mildDosage: "1-0-0 (Once daily)",
    severeDosage: "1-1-1 (Three times daily)"
  },
  {
    name: "Linax Plus Tablet",
    strength: "500 mg",
    indication: "Diabetes Management",
    company: "The IBN SINA Pharmaceutical Industry PLC",
    standardDosage: "1-0-1 (Morning & Night, before meal)",
    mildDosage: "1-0-0 (Once daily)",
    severeDosage: "Requires physician consultation"
  },
  {
    name: "Tanil Tablet",
    strength: "5 mg",
    indication: "Headache / Common Cold",
    company: "The ACME Laboratories Ltd.",
    standardDosage: "0-0-1 (At Night, after meal)",
    mildDosage: "1-0-0 (As needed)",
    severeDosage: "1-0-1 (Morning & Night)"
  },
  {
    name: "Docopa Capsule",
    strength: "200 mg",
    indication: "Sore Throat & Infection",
    company: "Aristopharma Ltd.",
    standardDosage: "1-0-1 (Morning & Night, after meal)",
    mildDosage: "1-0-0 (Once daily)",
    severeDosage: "1-1-1 (Three times daily max)"
  },
  {
    name: "Monas Tablet",
    strength: "10 mg",
    indication: "Cough, Allergic Rhinitis, Asthma",
    company: "The ACME Laboratories Ltd.",
    standardDosage: "0-0-1 (At Night, after meal)",
    mildDosage: "5 mg (0-0-1)",
    severeDosage: "10 mg (0-0-1)"
  },
  {
    name: "Renovit Tablet",
    strength: "Vit B1 100mg + B6 200mg + B12 200mcg",
    indication: "Arthritis Pain, Neuropathic Pain, Vitamin B Deficiency",
    company: "Healthcare Pharmaceuticals Ltd.",
    standardDosage: "1-0-1 (Morning & Night, after meal)",
    mildDosage: "1-0-0 (Once daily)",
    severeDosage: "1-0-1 or 1-1-1"
  },
  {
    name: "D Ric Capsule",
    strength: "40,000 IU",
    indication: "Vitamin D Deficiency",
    company: "Beximco Pharmaceuticals Ltd.",
    standardDosage: "1 Capsule / Week",
    mildDosage: "1 to 2 capsules monthly",
    severeDosage: "1 capsule weekly"
  },
  {
    name: "Algin Tablet",
    strength: "10 mg",
    indication: "Stomach Pain / Abdominal Cramps",
    company: "Renata PLC",
    standardDosage: "1-1-1 (Morning, Afternoon, Night)",
    mildDosage: "1-0-1 (Morning & Night)",
    severeDosage: "1-1-1 (As needed)"
  },
  {
    name: "Emistat Tablet",
    strength: "8 mg",
    indication: "Nausea & Vomiting",
    company: "Healthcare Pharmaceuticals Ltd.",
    standardDosage: "1-0-1 (30 minutes before meals)",
    mildDosage: "4 mg (1-0-0)",
    severeDosage: "8 mg (1-1-1 max)"
  },
  {
    name: "Etorix Tablet",
    strength: "120 mg",
    indication: "Toothache, Acute Pain, Inflammation",
    company: "Eskayef Pharmaceuticals Ltd.",
    standardDosage: "1-0-0 (Once daily after meal)",
    mildDosage: "60 mg / 90 mg (1-0-0)",
    severeDosage: "120 mg (Once daily max)"
  },
  {
    name: "Ecosprin Tablet",
    strength: "75 mg / 150 mg / 325 mg",
    indication: "Stroke / Heart Attack Prevention, Blood Thinner",
    company: "The ACME Laboratories Ltd.",
    standardDosage: "0-1-0 (Afternoon, after meal, 75 mg)",
    mildDosage: "75 mg daily (0-1-0)",
    severeDosage: "150 mg / 325 mg (Acute event)"
  },
  {
    name: "Blistain Tablet",
    strength: "20 mg",
    indication: "Allergy & Itching",
    company: "Square Pharmaceuticals PLC",
    standardDosage: "0-0-1 (At Night, after meal)",
    mildDosage: "10 mg (0-0-1)",
    severeDosage: "20 mg (0-0-1)"
  },
  {
    name: "Evo Capsule",
    strength: "500 mg",
    indication: "Chest & Respiratory Infection",
    company: "Beximco Pharmaceuticals Ltd.",
    standardDosage: "1-0-0 (Once daily, after meal)",
    mildDosage: "250 mg / 500 mg (1-0-0)",
    severeDosage: "500 mg (1-0-1 short term)"
  },
  {
    name: "Calbo Tablet",
    strength: "500 mg",
    indication: "Calcium Deficiency",
    company: "Square Pharmaceuticals PLC",
    standardDosage: "1-0-1 (Morning & Night, after meal)",
    mildDosage: "1-0-0 (Once daily)",
    severeDosage: "1-0-1 (Pregnancy / Acute deficiency)"
  },
  {
    name: "Monocard Tablet",
    strength: "20 mg",
    indication: "Heart Disease, Angina",
    company: "Drug International Ltd.",
    standardDosage: "1-0-1 (Morning & Night, after meal)",
    mildDosage: "10 mg (1-0-1)",
    severeDosage: "20 mg (1-0-1)"
  },
  {
    name: "Uromox D Capsule",
    strength: "500 mg",
    indication: "Frequent Urination / Urinary Tract Infection (UTI)",
    company: "UniMed UniHealth Pharmaceuticals Ltd.",
    standardDosage: "1-0-1 (Morning & Night, after meal)",
    mildDosage: "250 mg / 500 mg (1-0-1)",
    severeDosage: "500 mg (1-1-1)"
  },
  {
    name: "Tricel Capsule",
    strength: "500 mg",
    indication: "Bleeding Control",
    company: "Novovista Pharma Limited",
    standardDosage: "1-1-1 (Morning, Afternoon, Night - short term)",
    mildDosage: "1-0-1 (Morning & Night)",
    severeDosage: "1-1-1 (Under medical supervision)"
  },
  {
    name: "Pantonix Tablet",
    strength: "20 mg",
    indication: "Gastric, Acid Reflux (GERD)",
    company: "Incepta Pharmaceuticals Ltd.",
    standardDosage: "1-0-1 (30 minutes before Morning & Night meals)",
    mildDosage: "20 mg (1-0-0, Morning)",
    severeDosage: "40 mg (1-0-1)"
  }
];

async function main() {
  console.log('🔄 Importing medicine data...');
  
  // Using createMany for faster and bulk insertion
  const result = await prisma.medicine.createMany({
    data: medicines,
    skipDuplicates: true, // Will not insert if the record already exists
  });
  
  console.log(`✅ Successfully imported ${result.count} medicines!`);
}

main()
  .catch((e) => {
    console.error('❌ Error executing seed script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });