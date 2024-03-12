-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "list_agent_mls_id" TEXT NOT NULL,
    "interior_features" TEXT[],
    "appliances" TEXT[],
    "floor_description" TEXT NOT NULL DEFAULT '',
    "fire_place" BOOLEAN NOT NULL DEFAULT false,
    "exterior_features" TEXT[],
    "roof" TEXT[],
    "sewer" TEXT[],
    "area_name" TEXT NOT NULL,
    "days_on_market" INTEGER NOT NULL,
    "association_amenities" TEXT[],
    "garage" BOOLEAN NOT NULL DEFAULT false,
    "parking_features" TEXT[],
    "view" TEXT[],
    "county" TEXT NOT NULL,
    "water_source" TEXT[],
    "pool_features" TEXT[],
    "buyer_agency_compensation" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "squareFt" INTEGER NOT NULL,
    "beds" INTEGER NOT NULL,
    "baths" INTEGER NOT NULL,
    "isForSale" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "property_type" TEXT NOT NULL,
    "mls_id" TEXT NOT NULL,
    "listed_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "cooling" BOOLEAN NOT NULL DEFAULT false,
    "heating" BOOLEAN NOT NULL DEFAULT false,
    "city" TEXT NOT NULL,
    "pc" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "state_or_province" TEXT NOT NULL,
    "garage_spaces" INTEGER NOT NULL,
    "lot_size" INTEGER NOT NULL,
    "year_built" INTEGER NOT NULL,
    "stories" INTEGER NOT NULL,
    "has_association_fee" BOOLEAN NOT NULL DEFAULT false,
    "has_waterfront" BOOLEAN NOT NULL DEFAULT false,
    "has_pool" BOOLEAN NOT NULL DEFAULT false,
    "contract_date" TEXT NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "propertyId" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
