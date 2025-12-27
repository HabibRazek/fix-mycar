-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "carType" TEXT NOT NULL,
    "fuelType" TEXT NOT NULL,
    "transmission" TEXT NOT NULL,
    "mileage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diagnostics" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "vehicleId" TEXT,
    "problemCategory" TEXT NOT NULL,
    "problemSeverity" TEXT NOT NULL,
    "problemDuration" TEXT NOT NULL,
    "problemFrequency" TEXT NOT NULL,
    "symptoms" TEXT[],
    "warningLights" TEXT[],
    "problemDescription" TEXT NOT NULL,
    "recentMaintenance" TEXT,
    "additionalNotes" TEXT,
    "category" TEXT NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "partInvolved" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "urgency" TEXT NOT NULL,
    "repairAction" TEXT NOT NULL,
    "estimatedCostMin" DOUBLE PRECISION NOT NULL,
    "estimatedCostMax" DOUBLE PRECISION NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "vehicleBrand" TEXT,
    "vehicleModel" TEXT,
    "vehicleYear" TEXT,
    "vehicleMileage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "diagnostics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "vehicles_userId_idx" ON "vehicles"("userId");

-- CreateIndex
CREATE INDEX "vehicles_createdAt_idx" ON "vehicles"("createdAt");

-- CreateIndex
CREATE INDEX "diagnostics_userId_idx" ON "diagnostics"("userId");

-- CreateIndex
CREATE INDEX "diagnostics_createdAt_idx" ON "diagnostics"("createdAt");

-- CreateIndex
CREATE INDEX "diagnostics_category_idx" ON "diagnostics"("category");

-- CreateIndex
CREATE INDEX "diagnostics_severity_idx" ON "diagnostics"("severity");

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnostics" ADD CONSTRAINT "diagnostics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnostics" ADD CONSTRAINT "diagnostics_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
