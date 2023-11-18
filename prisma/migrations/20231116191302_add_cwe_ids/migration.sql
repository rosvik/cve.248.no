-- AlterTable
ALTER TABLE "CVE" ADD COLUMN     "cwe_ids" TEXT[] DEFAULT ARRAY[]::TEXT[];
