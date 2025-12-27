export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Paramètres</h1>
        <p className="text-gray-600 mb-6">
          Gérez vos préférences et paramètres de compte.
        </p>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Informations du compte</h3>
            <p className="text-sm text-gray-600">
              Modifiez vos informations personnelles et préférences.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Notifications</h3>
            <p className="text-sm text-gray-600">
              Configurez vos préférences de notification.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Sécurité</h3>
            <p className="text-sm text-gray-600">
              Gérez votre mot de passe et les paramètres de sécurité.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

