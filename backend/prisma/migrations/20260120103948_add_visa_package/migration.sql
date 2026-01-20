-- CreateTable
CREATE TABLE "visa_packages" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "processingTime" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "validity" TEXT NOT NULL,
    "entryType" TEXT NOT NULL,
    "requirements" TEXT[],
    "documents" JSONB NOT NULL,
    "applicationProcess" TEXT[],
    "faqs" JSONB NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "visa_packages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "visa_packages_slug_key" ON "visa_packages"("slug");
