"use client";

interface LiveSearchInputProps {
  id?: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
}

export function LiveSearchInput({
  id = "live-search-input",
  label,
  placeholder,
  value,
  onChange,
  onClear,
}: LiveSearchInputProps) {
  return (
    <div>
      <label className="text-sm font-bold text-gray-900" htmlFor={id}>
        {label}
      </label>
      <div className="mt-2 flex items-center gap-2">
        <input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 text-sm outline-none focus:ring-2 focus:ring-primary-200"
        />
        {value.trim() && (
          <button
            type="button"
            onClick={() => (onClear ? onClear() : onChange(""))}
            className="px-3 py-2 rounded-xl bg-white border border-gray-200 hover:border-primary-200 hover:text-primary transition-colors"
            aria-label="Limpiar busqueda"
          >
            Limpiar
          </button>
        )}
      </div>
    </div>
  );
}

