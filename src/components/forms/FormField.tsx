export const fieldInputClass =
  'w-full border border-[var(--color-crema-200)] bg-[var(--color-crema-50)] px-4 py-3 text-base text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)] focus:border-[var(--color-oxido-500)] focus:outline-none';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

export function FormField({ label, htmlFor, required, hint, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-base font-medium text-[var(--color-ink)]">
        {label} {required && <span className="text-[var(--color-oxido-500)]">*</span>}
      </label>
      {hint && <p className="mt-1 text-base text-[var(--color-ink-soft)]">{hint}</p>}
      <div className="mt-2">{children}</div>
    </div>
  );
}
