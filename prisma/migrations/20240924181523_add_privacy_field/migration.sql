/*
  Warnings:

  - Added the required column `privacy` to the `Gameroom` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Gameroom" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdat" TEXT NOT NULL,
    "privacy" BOOLEAN NOT NULL
);
INSERT INTO "new_Gameroom" ("createdat", "id", "name") SELECT "createdat", "id", "name" FROM "Gameroom";
DROP TABLE "Gameroom";
ALTER TABLE "new_Gameroom" RENAME TO "Gameroom";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
