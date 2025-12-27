/**
 * Diagnosis API Service
 * Connects Next.js frontend to Flask ML backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface DiagnosisFormData {
  brand: string;
  model: string;
  year: string;
  carType: string;
  fuelType: string;
  transmission: string;
  mileage: string;
  problemCategory: string;
  problemSeverity: string;
  problemDuration: string;
  problemFrequency: string;
  symptoms: string[];
  warningLights: string[];
  problemDescription: string;
  recentMaintenance?: string;
  additionalNotes?: string;
}

export interface DiagnosisPrediction {
  symptoms_input: string[];
  warning_lights_input: string[];
  category: string;
  diagnosis: string;
  part_involved: string;
  severity: string;
  urgency: string;
  repair_action: string;
  estimated_cost_min: number;
  estimated_cost_max: number;
  confidence: number;
  description: string;
  vehicle: {
    brand: string;
    model: string;
    year: string;
    mileage: string;
    fuelType: string;
    transmission: string;
  };
}

export interface DiagnosisResponse {
  success: boolean;
  prediction: DiagnosisPrediction;
}

export interface CategoriesResponse {
  categories: string[];
  severities: string[];
  urgencies: string[];
}

/**
 * Submit diagnosis form to get prediction
 */
export async function submitDiagnosis(formData: DiagnosisFormData): Promise<DiagnosisResponse> {
  const response = await fetch(`${API_BASE_URL}/api/diagnosis/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get diagnosis');
  }

  return response.json();
}

/**
 * Get available categories from the model
 */
export async function getCategories(): Promise<CategoriesResponse> {
  const response = await fetch(`${API_BASE_URL}/api/diagnosis/categories`);

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  return response.json();
}

/**
 * Check API health
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Get dynamic form data (symptoms, warning lights, categories) from backend
 */
export interface FormDataResponse {
  success: boolean;
  symptoms: Array<{ id: string; label: string }>;
  warningLights: Array<{ id: string; label: string }>;
  categories: string[];
  problemCategories: Array<{ value: string; label: string }>;
  error?: string;
}

export async function getFormData(): Promise<FormDataResponse> {
  const response = await fetch(`${API_BASE_URL}/api/diagnosis/form-data`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get form data');
  }
  
  return response.json();
}

// Severity labels in French
export const severityLabels: Record<string, { label: string; color: string; desc: string }> = {
  minor: { label: 'Mineur', color: 'bg-green-100 text-green-800', desc: 'Gêne légère' },
  moderate: { label: 'Modéré', color: 'bg-yellow-100 text-yellow-800', desc: 'Attention requise' },
  severe: { label: 'Sévère', color: 'bg-orange-100 text-orange-800', desc: 'Réparation urgente' },
  critical: { label: 'Critique', color: 'bg-red-100 text-red-800', desc: 'Danger potentiel' },
};

// Urgency labels in French
export const urgencyLabels: Record<string, { label: string; color: string }> = {
  low: { label: 'Faible', color: 'bg-blue-100 text-blue-800' },
  medium: { label: 'Moyen', color: 'bg-yellow-100 text-yellow-800' },
  high: { label: 'Élevé', color: 'bg-orange-100 text-orange-800' },
  critical: { label: 'Critique', color: 'bg-red-100 text-red-800' },
};

