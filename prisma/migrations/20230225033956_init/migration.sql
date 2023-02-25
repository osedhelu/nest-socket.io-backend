-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL,
    "last_login" DATETIME,
    "is_superuser" BOOLEAN NOT NULL DEFAULT false,
    "username" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "is_staff" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "refreshToken" TEXT
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT,
    CONSTRAINT "Roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Products" (
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

-- CreateTable
CREATE TABLE "Images" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "path" TEXT NOT NULL,
    "description" TEXT,
    "productsId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Images_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sizes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "tags" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

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
    "tagsId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("productsId", "tagsId"),
    CONSTRAINT "TagsOnProduct_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TagsOnProduct_tagsId_fkey" FOREIGN KEY ("tagsId") REFERENCES "tags" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_username" ON "user"("username");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_user_email" ON "user"("email");
Pragma writable_schema=0;

-- CreateIndex
CREATE UNIQUE INDEX "Products_slug_key" ON "Products"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Images_path_key" ON "Images"("path");

-- CreateIndex
CREATE UNIQUE INDEX "sizes_name_key" ON "sizes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");
