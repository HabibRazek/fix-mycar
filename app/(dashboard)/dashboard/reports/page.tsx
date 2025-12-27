export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Mes Rapports</h1>
        <p className="text-gray-600">
          Consultez tous vos rapports de diagnostic et leur historique.
        </p>
        <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            Aucun rapport disponible pour le moment.
          </p>
        </div>
      </div>
    </div>
  );
}

