-- CreateIndex for visa_packages table
CREATE INDEX IF NOT EXISTS "idx_visa_country" ON "visa_packages"("country");
CREATE INDEX IF NOT EXISTS "idx_visa_type" ON "visa_packages"("type");
CREATE INDEX IF NOT EXISTS "idx_visa_slug" ON "visa_packages"("slug");
CREATE INDEX IF NOT EXISTS "idx_visa_popular" ON "visa_packages"("isPopular" DESC);

-- CreateIndex for tours table  
CREATE INDEX IF NOT EXISTS "idx_tour_category" ON "tours"("category");
CREATE INDEX IF NOT EXISTS "idx_tour_country" ON "tours"("country");
CREATE INDEX IF NOT EXISTS "idx_tour_slug" ON "tours"("slug");
CREATE INDEX IF NOT EXISTS "idx_tour_active_featured" ON "tours"("isActive", "isFeatured" DESC);
CREATE INDEX IF NOT EXISTS "idx_tour_rating" ON "tours"("rating" DESC);

-- Composite index for common query patterns
CREATE INDEX IF NOT EXISTS "idx_visa_country_type" ON "visa_packages"("country", "type");
CREATE INDEX IF NOT EXISTS "idx_tour_category_active" ON "tours"("category", "isActive");
