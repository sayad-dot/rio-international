-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'REVIEWING', 'SHORTLISTED', 'INTERVIEW_SCHEDULED', 'REJECTED', 'ACCEPTED');

-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT[],
    "responsibilities" TEXT[],
    "benefits" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "positions" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_applications" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "coverLetter" TEXT NOT NULL,
    "resumeUrl" TEXT,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_applications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "jobs_isActive_idx" ON "jobs"("isActive");

-- CreateIndex
CREATE INDEX "job_applications_jobId_idx" ON "job_applications"("jobId");

-- CreateIndex
CREATE INDEX "job_applications_status_idx" ON "job_applications"("status");

-- CreateIndex
CREATE INDEX "job_applications_email_idx" ON "job_applications"("email");

-- AddForeignKey
ALTER TABLE "job_applications" ADD CONSTRAINT "job_applications_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
