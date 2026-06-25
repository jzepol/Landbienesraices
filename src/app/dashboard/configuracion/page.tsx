export default function ConfiguracionPage() {
  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-2xl font-bold text-warm-black mb-6">
        Configuración
      </h2>
      <div className="bg-white rounded-2xl p-6 border border-warm-black/5 space-y-4">
        <div>
          <h3 className="font-medium text-warm-black">Información del sistema</h3>
          <p className="text-sm text-warm-black/50 mt-1">
            Land Bienes Raíces v1.0 — Panel de administración
          </p>
        </div>
        <div>
          <h3 className="font-medium text-warm-black">Credenciales de acceso</h3>
          <p className="text-sm text-warm-black/50 mt-1">
            Email: admin@landbienesraices.com
          </p>
          <p className="text-sm text-warm-black/50">
            Las credenciales se gestionarán desde variables de entorno en producción.
          </p>
        </div>
        <div>
          <h3 className="font-medium text-warm-black">Base de datos</h3>
          <p className="text-sm text-warm-black/50 mt-1">
            PostgreSQL
          </p>
        </div>
      </div>
    </div>
  );
}