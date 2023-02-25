/*
  Warnings:

  - You are about to drop the column `productsId` on the `tags` table. All the data in the column will be lost.
  - You are about to drop the column `productsId` on the `sizes` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `sizes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "SizeOnProduct" (
    "productsId" INTEGER NOT NULL,
    "sizesId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("productsId", "sizesId"),
    CONSTRAINT "SizeOnProduct_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SizeOnProduct_sizesId_fkey" FOREIGN KEY ("sizesId") REFERENCES "sizes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TagsOnProduct" (
    "productsId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "tagsId" INTEGER,

    PRIMARY KEY ("productsId", "tagId"),
    CONSTRAINT "TagsOnProduct_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TagsOnProduct_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "sizes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TagsOnProduct_tagsId_fkey" FOREIGN KEY ("tagsId") REFERENCES "tags" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Images" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "path" TEXT NOT NULL,
    "description" TEXT,
    "productsId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Images_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Images" ("description", "id", "path", "productsId") SELECT "description", "id", "path", "productsId" FROM "Images";
DROP TABLE "Images";
ALTER TABLE "new_Images" RENAME TO "Images";
CREATE UNIQUE INDEX "Images_path_key" ON "Images"("path");
CREATE TABLE "new_tags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_tags" ("id", "name") SELECT "id", "name" FROM "tags";
DROP TABLE "tags";
ALTER TABLE "new_tags" RENAME TO "tags";
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");
CREATE TABLE "new_sizes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_sizes" ("id", "name") SELECT "id", "name" FROM "sizes";
DROP TABLE "sizes";
ALTER TABLE "new_sizes" RENAME TO "sizes";
CREATE UNIQUE INDEX "sizes_name_key" ON "sizes"("name");
CREATE TABLE "new_Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "inStock" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Products" ("description", "gender", "id", "inStock", "price", "slug", "title", "type") SELECT "description", "gender", "id", "inStock", "price", "slug", "title", "type" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
CREATE UNIQUE INDEX "Products_slug_key" ON "Products"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
