export default function VehiclesPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Mes Véhicules</h1>
        <p className="text-gray-600">
          Gérez vos véhicules et consultez leur historique de diagnostics.
        </p>
        <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            Aucun véhicule enregistré pour le moment.
          </p>
        </div>
      </div>
    </div>
  );
}

