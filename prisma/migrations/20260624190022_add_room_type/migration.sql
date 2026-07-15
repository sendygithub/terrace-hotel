-- AlterTable
ALTER TABLE "public"."Room" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'deluxe';

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "password" TEXT;
