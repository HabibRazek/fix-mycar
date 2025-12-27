-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_createdAt_idx" ON "users"("createdAt");

-- CreateIndex
CREATE INDEX "users_emailVerified_idx" ON "users"("emailVerified");

-- CreateIndex
CREATE INDEX "users_role_createdAt_idx" ON "users"("role", "createdAt");
