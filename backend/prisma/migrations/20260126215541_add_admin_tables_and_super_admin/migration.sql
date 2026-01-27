/*
  Warnings:

  - The values [AGENT] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('CUSTOMER', 'ADMIN', 'SUPER_ADMIN');
ALTER TABLE "public"."users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'CUSTOMER';
COMMIT;

-- DropIndex
DROP INDEX "idx_tour_active_featured";

-- DropIndex
DROP INDEX "idx_tour_category";

-- DropIndex
DROP INDEX "idx_tour_category_active";

-- DropIndex
DROP INDEX "idx_tour_country";

-- DropIndex
DROP INDEX "idx_tour_rating";

-- DropIndex
DROP INDEX "idx_tour_slug";

-- DropIndex
DROP INDEX "idx_visa_country";

-- DropIndex
DROP INDEX "idx_visa_country_type";

-- DropIndex
DROP INDEX "idx_visa_popular";

-- DropIndex
DROP INDEX "idx_visa_slug";

-- DropIndex
DROP INDEX "idx_visa_type";

-- CreateTable
CREATE TABLE "contact_inquiries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "InquiryStatus" NOT NULL DEFAULT 'PENDING',
    "assignedTo" TEXT,
    "response" TEXT,
    "respondedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "details" JSONB,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "contact_inquiries_status_idx" ON "contact_inquiries"("status");

-- CreateIndex
CREATE INDEX "contact_inquiries_createdAt_idx" ON "contact_inquiries"("createdAt");

-- CreateIndex
CREATE INDEX "activity_logs_userId_idx" ON "activity_logs"("userId");

-- CreateIndex
CREATE INDEX "activity_logs_createdAt_idx" ON "activity_logs"("createdAt");

-- CreateIndex
CREATE INDEX "activity_logs_entity_idx" ON "activity_logs"("entity");

-- AddForeignKey
ALTER TABLE "contact_inquiries" ADD CONSTRAINT "contact_inquiries_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "activity_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
