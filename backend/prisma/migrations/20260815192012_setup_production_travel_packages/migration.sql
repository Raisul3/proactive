-- AlterTable
ALTER TABLE "travel_plans" ADD COLUMN     "packageId" TEXT;

-- CreateTable
CREATE TABLE "travel_packages" (
    "id" TEXT NOT NULL,
    "package_id" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "traditional_places" TEXT[],
    "best_visiting_areas" TEXT[],
    "base_budget" JSONB NOT NULL,
    "transport" JSONB NOT NULL,
    "hotel" JSONB NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "source" TEXT,
    "last_verified_at" TIMESTAMP(3),
    "verified_by" TEXT,
    "currency" TEXT NOT NULL DEFAULT 'BDT',
    "season" TEXT NOT NULL DEFAULT 'all_year',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "travel_packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transport_options" (
    "id" TEXT NOT NULL,
    "package_id" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,
    "operator" TEXT,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "source" TEXT,
    "last_verified_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transport_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotel_options" (
    "id" TEXT NOT NULL,
    "package_id" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "price_per_night" DECIMAL(12,2) NOT NULL,
    "hotel_name" TEXT,
    "booking_url" TEXT,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "source" TEXT,
    "last_verified_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hotel_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "price_history" (
    "id" TEXT NOT NULL,
    "package_id" TEXT NOT NULL,
    "field_name" TEXT NOT NULL,
    "old_value" DECIMAL(12,2),
    "new_value" DECIMAL(12,2),
    "changed_by" TEXT,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "price_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "travel_packages_package_id_key" ON "travel_packages"("package_id");

-- CreateIndex
CREATE UNIQUE INDEX "transport_options_package_id_mode_operator_key" ON "transport_options"("package_id", "mode", "operator");

-- CreateIndex
CREATE UNIQUE INDEX "hotel_options_package_id_tier_hotel_name_key" ON "hotel_options"("package_id", "tier", "hotel_name");

-- AddForeignKey
ALTER TABLE "travel_plans" ADD CONSTRAINT "travel_plans_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "travel_packages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transport_options" ADD CONSTRAINT "transport_options_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "travel_packages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hotel_options" ADD CONSTRAINT "hotel_options_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "travel_packages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_history" ADD CONSTRAINT "price_history_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "travel_packages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
