import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type: "text" | "email" | "tel" | "date" | "select";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type, value, onChange }) => {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      {type === "select" ? (
        // Select para opciones Sí/No
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="border rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccione...</option>
          <option value="SI">Sí</option>
          <option value="NO">No</option>
        </select>
      ) : (
        // Inputs normales (text, email, tel, date)
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className="border rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  );
};

export default InputField;
