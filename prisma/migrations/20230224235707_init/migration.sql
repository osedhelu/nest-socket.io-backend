/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Products` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Images" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "path" TEXT NOT NULL,
    "description" TEXT,
    "productsId" INTEGER,
    CONSTRAINT "Images_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Images" ("description", "id", "path", "productsId") SELECT "description", "id", "path", "productsId" FROM "Images";
DROP TABLE "Images";
ALTER TABLE "new_Images" RENAME TO "Images";
CREATE UNIQUE INDEX "Images_path_key" ON "Images"("path");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Products_slug_key" ON "Products"("slug");
