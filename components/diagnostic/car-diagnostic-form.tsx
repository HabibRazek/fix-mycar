"use client";

import { useState } from "react";
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Car, CheckCircle2, ChevronRight, ChevronLeft, Loader2, AlertTriangle, Wrench, DollarSign, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  carBrands, carTypes, fuelTypes, transmissionTypes, problemCategories as staticProblemCategories,
  severityLevels, durationOptions, frequencyOptions, symptoms as staticSymptoms, warningLightOptions as staticWarningLights, years
} from "./form-data";
import { submitDiagnosis, DiagnosisPrediction, severityLabels, urgencyLabels, checkApiHealth, getFormData } from "@/lib/diagnosis-api";

const schema = z.object({
  brand: z.string().min(1, "La marque est requise"),
  model: z.string().min(1, "Le modèle est requis"),
  year: z.string().min(1, "L'année est requise"),
  carType: z.string().min(1, "Le type de véhicule est requis"),
  fuelType: z.string().min(1, "Le type de carburant est requis"),
  transmission: z.string().min(1, "La transmission est requise"),
  mileage: z.string().min(1, "Le kilométrage est requis"),
  problemCategory: z.string().min(1, "La catégorie du problème est requise"),
  problemSeverity: z.string().min(1, "La sévérité est requise"),
  problemDuration: z.string().min(1, "La durée est requise"),
  problemFrequency: z.string().min(1, "La fréquence est requise"),
  symptoms: z.array(z.string()).min(1, "Sélectionnez au moins un symptôme"),
  warningLights: z.array(z.string()),
  problemDescription: z.string().min(10, "Min. 10 caractères"),
  recentMaintenance: z.string().optional(),
  additionalNotes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;
type FormProps = { 
  form: UseFormReturn<FormValues>;
  problemCategories?: Array<{ value: string; label: string; icon?: any }>;
  symptoms?: Array<{ id: string; label: string }>;
  warningLightOptions?: Array<{ id: string; label: string }>;
};

function Step1({ form }: FormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField control={form.control} name="brand" render={({ field }) => (
        <FormItem>
          <FormLabel>Marque *</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl><SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger></FormControl>
            <SelectContent>{carBrands.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="model" render={({ field }) => (
        <FormItem>
          <FormLabel>Modèle *</FormLabel>
          <FormControl><Input placeholder="Ex: Golf, Clio, 308..." {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="year" render={({ field }) => (
        <FormItem>
          <FormLabel>Année *</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl><SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger></FormControl>
            <SelectContent>{years.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}</SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="carType" render={({ field }) => (
        <FormItem>
          <FormLabel>Type de véhicule *</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl><SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger></FormControl>
            <SelectContent>{carTypes.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="fuelType" render={({ field }) => (
        <FormItem>
          <FormLabel>Carburant *</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl><SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger></FormControl>
            <SelectContent>{fuelTypes.map((f) => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}</SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="transmission" render={({ field }) => (
        <FormItem>
          <FormLabel>Transmission *</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl><SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger></FormControl>
            <SelectContent>{transmissionTypes.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="mileage" render={({ field }) => (
        <FormItem className="md:col-span-2">
          <FormLabel>Kilométrage *</FormLabel>
          <FormControl><Input type="number" placeholder="Ex: 85000" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </div>
  );
}

function Step2({ form, problemCategories = staticProblemCategories }: FormProps) {
  return (
    <div className="space-y-6">
      <FormField control={form.control} name="problemCategory" render={({ field }) => (
        <FormItem>
          <FormLabel>Catégorie du problème *</FormLabel>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {problemCategories.map((cat) => (
              <div key={cat.value} onClick={() => field.onChange(cat.value)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all text-center hover:border-primary
                  ${field.value === cat.value ? "border-primary bg-primary/5" : "border-gray-200"}`}>
                <cat.icon className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm font-medium">{cat.label}</span>
              </div>
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="problemSeverity" render={({ field }) => (
        <FormItem>
          <FormLabel>Niveau de sévérité *</FormLabel>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {severityLevels.map((level) => (
              <div key={level.value} onClick={() => field.onChange(level.value)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all text-center
                  ${field.value === level.value ? `border-2 ${level.color}` : "border-gray-200 hover:border-gray-300"}`}>
                <span className="font-semibold block">{level.label}</span>
                <span className="text-xs text-gray-500">{level.desc}</span>
              </div>
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField control={form.control} name="problemDuration" render={({ field }) => (
          <FormItem>
            <FormLabel>Depuis combien de temps? *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl><SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger></FormControl>
              <SelectContent>{durationOptions.map((d) => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="problemFrequency" render={({ field }) => (
          <FormItem>
            <FormLabel>Fréquence *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl><SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger></FormControl>
              <SelectContent>{frequencyOptions.map((f) => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
      </div>
    </div>
  );
}

function Step3({ form, symptoms = staticSymptoms, warningLightOptions = staticWarningLights }: FormProps) {
  return (
    <div className="space-y-8">
      <FormField control={form.control} name="symptoms" render={() => (
        <FormItem>
          <FormLabel className="text-base">Symptômes observés *</FormLabel>
          <p className="text-sm text-gray-500 mb-4">Sélectionnez tous les symptômes que vous avez remarqués</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {symptoms.map((symptom) => (
              <FormField key={symptom.id} control={form.control} name="symptoms"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3 space-y-0 p-3 border rounded-lg hover:bg-gray-50">
                    <FormControl>
                      <Checkbox checked={field.value?.includes(symptom.id)}
                        onCheckedChange={(checked) => {
                          const val = field.value || [];
                          field.onChange(checked ? [...val, symptom.id] : val.filter((v) => v !== symptom.id));
                        }} />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">{symptom.label}</FormLabel>
                  </FormItem>
                )} />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="warningLights" render={() => (
        <FormItem>
          <FormLabel className="text-base">Voyants allumés</FormLabel>
          <p className="text-sm text-gray-500 mb-4">Sélectionnez les voyants allumés sur votre tableau de bord</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {warningLightOptions.map((light) => (
              <FormField key={light.id} control={form.control} name="warningLights"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3 space-y-0 p-3 border rounded-lg hover:bg-gray-50">
                    <FormControl>
                      <Checkbox checked={field.value?.includes(light.id)}
                        onCheckedChange={(checked) => {
                          const val = field.value || [];
                          field.onChange(checked ? [...val, light.id] : val.filter((v) => v !== light.id));
                        }} />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">{light.label}</FormLabel>
                  </FormItem>
                )} />
            ))}
          </div>
        </FormItem>
      )} />
    </div>
  );
}

function Step4({ form }: FormProps) {
  return (
    <div className="space-y-6">
      <FormField control={form.control} name="problemDescription" render={({ field }) => (
        <FormItem>
          <FormLabel>Description détaillée du problème *</FormLabel>
          <FormControl>
            <Textarea placeholder="Décrivez le problème en détail: quand il se produit, dans quelles conditions, les sons ou comportements observés..."
              className="min-h-[120px]" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="recentMaintenance" render={({ field }) => (
        <FormItem>
          <FormLabel>Entretiens récents</FormLabel>
          <FormControl>
            <Textarea placeholder="Mentionnez les réparations ou entretiens effectués récemment (vidange, freins, etc.)"
              className="min-h-20" {...field} />
          </FormControl>
        </FormItem>
      )} />
      <FormField control={form.control} name="additionalNotes" render={({ field }) => (
        <FormItem>
          <FormLabel>Notes supplémentaires</FormLabel>
          <FormControl>
            <Textarea placeholder="Toute autre information utile pour le diagnostic..."
              className="min-h-20" {...field} />
          </FormControl>
        </FormItem>
      )} />
    </div>
  );
}

export function CarDiagnosticForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prediction, setPrediction] = useState<DiagnosisPrediction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiConnected, setApiConnected] = useState<boolean | null>(null);
  
  // Dynamic form data from backend
  const [symptoms, setSymptoms] = useState<Array<{ id: string; label: string }>>(staticSymptoms);
  const [warningLightOptions, setWarningLightOptions] = useState<Array<{ id: string; label: string }>>(staticWarningLights);
  const [problemCategories, setProblemCategories] = useState(staticProblemCategories);
  const [isLoadingFormData, setIsLoadingFormData] = useState(true);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      brand: "", model: "", year: "", carType: "", fuelType: "", transmission: "", mileage: "",
      problemCategory: "", problemSeverity: "", problemDuration: "", problemFrequency: "",
      symptoms: [], warningLights: [], problemDescription: "", recentMaintenance: "", additionalNotes: "",
    },
  });

  // Load dynamic form data and check API connection on mount
  React.useEffect(() => {
    const loadFormData = async () => {
      setIsLoadingFormData(true);
      try {
        const connected = await checkApiHealth();
        setApiConnected(connected);
        
        if (connected) {
          // Try to load dynamic form data from backend
          try {
            const formData = await getFormData();
            if (formData.success) {
              setSymptoms(formData.symptoms);
              setWarningLightOptions(formData.warningLights);
              // Map problem categories to include icons (keep static icons)
              const mappedCategories = formData.problemCategories.map(pc => {
                const staticCat = staticProblemCategories.find(sc => sc.value === pc.value);
                return {
                  value: pc.value,
                  label: pc.label,
                  icon: staticCat?.icon || Settings
                };
              });
              setProblemCategories(mappedCategories.length > 0 ? mappedCategories : staticProblemCategories);
              console.log("✅ Dynamic form data loaded from backend");
            }
          } catch (formDataError) {
            console.warn("Failed to load dynamic form data, using static data:", formDataError);
            // Keep static data as fallback
          }
        }
      } catch (error) {
        console.error("Error loading form data:", error);
      } finally {
        setIsLoadingFormData(false);
      }
    };
    
    loadFormData();
    
    // Check API health every 30 seconds
    const interval = setInterval(async () => {
      const connected = await checkApiHealth();
      setApiConnected(connected);
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const validateStep = async (s: number) => {
    const fields: Record<number, (keyof FormValues)[]> = {
      1: ["brand", "model", "year", "carType", "fuelType", "transmission", "mileage"],
      2: ["problemCategory", "problemSeverity", "problemDuration", "problemFrequency"],
      3: ["symptoms"],
      4: ["problemDescription"],
    };
    return form.trigger(fields[s] || []);
  };

  const next = async () => { if (await validateStep(step) && step < 4) setStep(step + 1); };
  const prev = () => { if (step > 1) setStep(step - 1); };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      // Ensure all required fields are present and properly formatted
      const formData = {
        brand: data.brand.trim(),
        model: data.model.trim(),
        year: data.year.trim(),
        carType: data.carType,
        fuelType: data.fuelType,
        transmission: data.transmission,
        mileage: data.mileage.trim(),
        problemCategory: data.problemCategory,
        problemSeverity: data.problemSeverity,
        problemDuration: data.problemDuration,
        problemFrequency: data.problemFrequency,
        symptoms: Array.isArray(data.symptoms) ? data.symptoms : [],
        warningLights: Array.isArray(data.warningLights) ? data.warningLights : [],
        problemDescription: data.problemDescription.trim(),
        recentMaintenance: data.recentMaintenance?.trim() || "",
        additionalNotes: data.additionalNotes?.trim() || "",
      };

      // Validate that we have at least symptoms or description
      if (formData.symptoms.length === 0 && formData.problemDescription.length < 10) {
        setError("Veuillez sélectionner au moins un symptôme ou fournir une description détaillée");
        setIsSubmitting(false);
        return;
      }

      const response = await submitDiagnosis(formData);
      
      if (response.success && response.prediction) {
      setPrediction(response.prediction);
        
        // Save diagnosis to database
        try {
          const saveData = {
            // Form data
            ...formData,
            // Prediction results - map field names correctly (backend uses snake_case, DB uses camelCase)
            category: response.prediction.category,
            diagnosis: response.prediction.diagnosis,
            partInvolved: response.prediction.part_involved,
            severity: response.prediction.severity,
            urgency: response.prediction.urgency,
            repairAction: response.prediction.repair_action,
            estimatedCostMin: response.prediction.estimated_cost_min,
            estimatedCostMax: response.prediction.estimated_cost_max,
            confidence: response.prediction.confidence,
          };

          console.log("Saving diagnosis to database:", saveData);

          const saveResponse = await fetch("/api/diagnosis/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(saveData),
          });

          if (!saveResponse.ok) {
            const errorData = await saveResponse.json().catch(() => ({}));
            console.error("❌ Error saving diagnosis:", errorData);
            console.error("Response status:", saveResponse.status);
            console.error("Request data sent:", saveData);
            // Log error but prediction was successful - user can still see results
            console.warn("Diagnostic prédit avec succès mais non sauvegardé en base de données");
          } else {
            const saveResult = await saveResponse.json();
            console.log("✅ Diagnosis saved successfully to database:", saveResult);
            // Refresh dashboard stats after successful save
            window.dispatchEvent(new Event('diagnosis-saved'));
          }
        } catch (saveError) {
          console.error("Error saving diagnosis:", saveError);
          // Log error but prediction was successful - user can still see results
          console.warn("Diagnostic prédit avec succès mais erreur lors de la sauvegarde");
        }
      } else {
        setError("Réponse invalide du serveur");
      }
    } catch (err) {
      console.error("Diagnosis submission error:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'string') {
        setError(err);
      } else {
        setError('Une erreur est survenue lors de la connexion au serveur. Vérifiez que le backend est démarré.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setPrediction(null);
    setError(null);
    setStep(1);
    form.reset();
  };

  // Show prediction results
  if (prediction) {
    const severity = severityLabels[prediction.severity] || severityLabels.moderate;
    const urgency = urgencyLabels[prediction.urgency] || urgencyLabels.medium;

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center border-b">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-green-600" /> Résultat du Diagnostic
          </CardTitle>
          <CardDescription>
            Confiance: {prediction.confidence}%
          </CardDescription>
          <div className="mt-2">
            <div className="inline-flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
              <CheckCircle2 className="h-4 w-4" />
              <span>Diagnostic enregistré dans la base de données</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Diagnosis */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Wrench className="h-5 w-5" /> Diagnostic
            </h3>
            <p className="text-xl font-bold text-blue-800 mt-1">{prediction.diagnosis}</p>
            <p className="text-gray-600 mt-2">{prediction.repair_action}</p>
          </div>

          {/* Severity & Urgency */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-gray-500">Sévérité</p>
              <Badge className={severity.color}>{severity.label}</Badge>
              <p className="text-xs text-gray-500 mt-1">{severity.desc}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-gray-500">Urgence</p>
              <Badge className={urgency.color}>{urgency.label}</Badge>
            </div>
          </div>

          {/* Cost Estimate */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold flex items-center gap-2">
              <DollarSign className="h-5 w-5" /> Coût estimé
            </h3>
            <p className="text-2xl font-bold text-green-800">
              {prediction.estimated_cost_min}€ - {prediction.estimated_cost_max}€
            </p>
            <p className="text-sm text-gray-600">Pièce: {prediction.part_involved}</p>
          </div>

          {/* Vehicle Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Véhicule analysé</h3>
            <p className="text-gray-700">
              {prediction.vehicle.brand} {prediction.vehicle.model} ({prediction.vehicle.year}) - {prediction.vehicle.mileage} km
            </p>
          </div>

          <Button onClick={resetForm} className="w-full">Nouveau diagnostic</Button>
        </CardContent>
      </Card>
    );
  }

  // Show error
  if (error) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-10 pb-10 text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold">Erreur</h2>
          <p className="text-gray-600">{error}</p>
          {apiConnected === false && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left">
              <p className="text-sm text-yellow-800 font-semibold mb-2">Conseil de dépannage:</p>
              <ul className="text-sm text-yellow-700 list-disc list-inside space-y-1">
                <li>Vérifiez que le backend Flask est démarré sur le port 5000</li>
                <li>Exécutez: <code className="bg-yellow-100 px-1 rounded">cd fix-mycar-back && python run.py</code></li>
                <li>Vérifiez que l'URL de l'API est correcte dans les variables d'environnement</li>
              </ul>
            </div>
          )}
          <div className="flex gap-2 justify-center">
            <Button onClick={resetForm} variant="outline">Retour au formulaire</Button>
            <Button onClick={() => {
              setError(null);
              checkApiHealth().then(setApiConnected);
            }}>Vérifier la connexion</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const stepTitles = ["Informations véhicule", "Type de problème", "Symptômes", "Détails"];

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader className="text-center border-b">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <Car className="h-6 w-6" /> Diagnostic Automobile
          </CardTitle>
          <CardDescription>Remplissez ce formulaire pour obtenir un diagnostic précis</CardDescription>
          {/* API Connection Status */}
          {apiConnected !== null && (
            <div className="mt-2 space-y-1">
              {apiConnected ? (
                <div className="inline-flex items-center gap-2 text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>API connectée</span>
                  {isLoadingFormData && <span className="text-xs text-gray-500">(Chargement des données dynamiques...)</span>}
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 text-sm text-red-600">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>API non connectée - Vérifiez que le backend est démarré</span>
                </div>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent className="pt-8">
          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all
                  ${step === s ? "bg-primary text-white" : step > s ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"}`}>
                  {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
                </div>
                {s < 4 && <div className={`w-12 md:w-20 h-1 mx-1 md:mx-2 ${step > s ? "bg-green-500" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
          <h3 className="text-lg font-semibold text-center mb-6">{stepTitles[step - 1]}</h3>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && <Step1 form={form} />}
              {step === 2 && <Step2 form={form} problemCategories={problemCategories} />}
              {step === 3 && <Step3 form={form} symptoms={symptoms} warningLightOptions={warningLightOptions} />}
              {step === 4 && <Step4 form={form} />}

              <div className="flex justify-between pt-6 border-t">
                <Button type="button" variant="outline" onClick={prev} disabled={step === 1}>
                  <ChevronLeft className="h-4 w-4 mr-2" /> Précédent
                </Button>
                {step < 4 ? (
                  <Button type="button" onClick={next}>Suivant <ChevronRight className="h-4 w-4 ml-2" /></Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting || apiConnected === false}>
                    {isSubmitting ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Analyse...</>
                    ) : apiConnected === false ? (
                      "API non connectée"
                    ) : (
                      "Soumettre le diagnostic"
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

