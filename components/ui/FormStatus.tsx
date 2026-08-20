import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

type FormStatusVariant = "success" | "error" | "info";

const config = {
  success: {
    icon: CheckCircle2,
    className: "border-green-200 bg-green-50 text-green-900",
  },
  error: {
    icon: AlertCircle,
    className: "border-red-200 bg-red-50 text-red-900",
  },
  info: {
    icon: Info,
    className: "border-deep-teal/20 bg-mist text-ink",
  },
} as const;

export interface FormStatusProps {
  variant: FormStatusVariant;
  title: string;
  message?: string;
  className?: string;
}

export function FormStatus({
  variant,
  title,
  message,
  className,
}: FormStatusProps) {
  const { icon: Icon, className: variantClass } = config[variant];

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex gap-3 rounded-lg border p-4",
        variantClass,
        className,
      )}
    >
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <div>
        <p className="font-semibold">{title}</p>
        {message && <p className="mt-1 text-sm opacity-90">{message}</p>}
      </div>
    </div>
  );
}
