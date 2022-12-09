-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "emergency_contact" TEXT,
    "phone" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collision" (
    "id" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "dateCollision" TIMESTAMP(3) NOT NULL,
    "sensorX" TEXT NOT NULL,
    "sensorY" TEXT NOT NULL,
    "sensorZ" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "detail" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Collision_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Collision" ADD CONSTRAINT "Collision_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
