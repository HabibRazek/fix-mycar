// User roles for the Fix My Car application
export enum UserRole {
  OWNER = "OWNER",           // Car owners/drivers
  MECHANIC = "MECHANIC",     // Garage partners
  INSURER = "INSURER",       // Insurance experts
  ADMIN = "ADMIN",           // System administrators
  ML_ENGINEER = "ML_ENGINEER" // Data scientists (optional)
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string;
  emailVerified?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: UserRole;
}

export interface SignInFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ResetPasswordFormData {
  email: string;
}

export interface NewPasswordFormData {
  password: string;
  confirmPassword: string;
  token: string;
}

// Role display names for UI
export const roleDisplayNames: Record<UserRole, string> = {
  [UserRole.OWNER]: "Propriétaire de véhicule",
  [UserRole.MECHANIC]: "Mécanicien / Garage",
  [UserRole.INSURER]: "Assureur",
  [UserRole.ADMIN]: "Administrateur",
  [UserRole.ML_ENGINEER]: "Ingénieur ML"
};

// Role descriptions for registration
export const roleDescriptions: Record<UserRole, string> = {
  [UserRole.OWNER]: "Je possède un véhicule et je cherche un diagnostic",
  [UserRole.MECHANIC]: "Je suis un professionnel de la réparation automobile",
  [UserRole.INSURER]: "Je travaille dans le secteur de l'assurance auto",
  [UserRole.ADMIN]: "Accès administrateur (sur invitation uniquement)",
  [UserRole.ML_ENGINEER]: "Ingénieur en apprentissage automatique"
};

