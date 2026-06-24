import {
  Zap,
  Droplets,
  Flame,
  Wifi,
  Pipette,
  Road,
  Lightbulb,
} from "lucide-react";
import { Propiedad } from "@/generated/prisma/client";
import { SERVICIOS } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  servicioLuz: <Zap className="w-5 h-5" />,
  servicioAgua: <Droplets className="w-5 h-5" />,
  servicioGas: <Flame className="w-5 h-5" />,
  servicioInternet: <Wifi className="w-5 h-5" />,
  servicioCloacas: <Pipette className="w-5 h-5" />,
  servicioPavimento: <Road className="w-5 h-5" />,
  servicioAlumbrado: <Lightbulb className="w-5 h-5" />,
};

interface ServiceIconsProps {
  propiedad: Propiedad;
}

export default function ServiceIcons({ propiedad }: ServiceIconsProps) {
  const activeServices = SERVICIOS.filter(
    (s) => propiedad[s.key as keyof Propiedad] === true
  );

  if (activeServices.length === 0) return null;

  return (
    <div>
      <h3 className="font-display text-xl font-semibold text-warm-black mb-4">
        Servicios disponibles
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {activeServices.map((servicio) => (
          <div
            key={servicio.key}
            className="flex items-center gap-3 bg-cream rounded-xl px-4 py-3"
          >
            <div className="text-mustard">{iconMap[servicio.key]}</div>
            <span className="text-sm text-warm-black/80">{servicio.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}