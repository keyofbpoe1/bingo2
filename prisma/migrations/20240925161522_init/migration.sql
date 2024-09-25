/*
  Warnings:

  - The primary key for the `Gameroom` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Gameroom" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdat" TEXT NOT NULL,
    "privacy" BOOLEAN NOT NULL
);
INSERT INTO "new_Gameroom" ("createdat", "id", "name", "privacy") SELECT "createdat", "id", "name", "privacy" FROM "Gameroom";
DROP TABLE "Gameroom";
ALTER TABLE "new_Gameroom" RENAME TO "Gameroom";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
