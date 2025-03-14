import { useState, useEffect } from "react";
import Select from "react-select";

interface Option<T> {
  value: T;
  label: string;
}

interface SelectFieldProps<T> {
  label?: string;
  fetchFunction: () => Promise<T[]>;
  idKey: keyof T;
  nameKey: keyof T;
  value: T | null;
  onChange: (value: T) => void;
  placeholder?: string;
}

const SelectField = <T,>({
  label,
  fetchFunction,
  idKey,
  nameKey,
  value,
  onChange,
  placeholder = "Seleccione...",
}: SelectFieldProps<T>) => {
  const [options, setOptions] = useState<Option<T>[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFunction();
        const formattedOptions: Option<T>[] = data.map((item) => ({
          value: item,
          label: String(item[nameKey]), // Convertimos a string para evitar errores
        }));
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, [fetchFunction, idKey, nameKey]);

  return (
    <div className="flex flex-col mb-4">
      {label &&

        <label className="text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>}



      <Select
        value={options.find((opt) => opt.value === value) || null}
        options={options}
        onChange={(selectedOption) => onChange(selectedOption?.value as T)}
        placeholder={placeholder}
        classNames={{
          control: () => "border rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-blue-500",
          menu: () => "border rounded-md bg-white shadow-lg",
          option: ({ isFocused }) =>
            isFocused ? "bg-blue-100 p-2 cursor-pointer" : "p-2 cursor-pointer",
        }}
      />
    </div>
  );
};

export default SelectField;
