-- CreateTable
CREATE TABLE "medicines" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "strength" TEXT NOT NULL,
    "indication" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "standard_dosage" TEXT NOT NULL,
    "mild_dosage" TEXT NOT NULL,
    "severe_dosage" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medicines_pkey" PRIMARY KEY ("id")
);
