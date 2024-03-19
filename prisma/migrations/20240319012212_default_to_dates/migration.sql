-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "listed_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "contract_date" DROP NOT NULL;
