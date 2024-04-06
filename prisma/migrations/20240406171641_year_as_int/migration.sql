/*
  Warnings:

  - You are about to alter the column `year` on the `VehicleSale` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VehicleSale" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "fuel" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "email" TEXT NOT NULL
);
INSERT INTO "new_VehicleSale" ("email", "fuel", "id", "model", "price", "year") SELECT "email", "fuel", "id", "model", "price", "year" FROM "VehicleSale";
DROP TABLE "VehicleSale";
ALTER TABLE "new_VehicleSale" RENAME TO "VehicleSale";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
