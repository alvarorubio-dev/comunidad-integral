interface ConsentCheckboxProps {
  id: string;
  name?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function ConsentCheckbox({ id, name = 'consentimiento', checked, onChange }: ConsentCheckboxProps) {
  const controlledProps = onChange
    ? { checked, onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked) }
    : {};

  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-base text-[var(--color-ink-soft)]">
      <input
        id={id}
        name={name}
        type="checkbox"
        required
        className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-oxido-500)]"
        {...controlledProps}
      />
      <span>
        He leído y acepto la{' '}
        <a href="/privacidad/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-ink)] underline hover:text-[var(--color-oxido-600)]">
          Política de Privacidad
        </a>
        . <span className="text-[var(--color-oxido-500)]">*</span>
      </span>
    </label>
  );
}
