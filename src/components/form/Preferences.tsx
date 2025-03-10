import React, { useState } from 'react';

// Definición de tipos
interface PreferencesFormData {
  travelAvailability: 'Sí' | 'No';
  workAvailability: string;
  salaryExpectation: string;
  currentlyWorking: 'Sí' | 'No';
  reasonForLeaving: string;
  motivation: string;
}

const Preferences: React.FC = () => {
  const [formData, setFormData] = useState<PreferencesFormData>({
    travelAvailability: 'No',
    workAvailability: '',
    salaryExpectation: '',
    currentlyWorking: 'No',
    reasonForLeaving: '',
    motivation: '',
  });

  // Opciones predefinidas
  const workAvailabilityOptions = ['Inmediata', '1 semana', '15 días', '1 mes', 'Más de 1 mes'];
  const salaryRanges = ['Menos de $2M', '$2M - $4M', '$4M - $6M', 'Más de $6M'];
  const reasonsForLeaving = ['Cambio de carrera', 'Mejor oportunidad', 'Despido', 'Contrato finalizado', 'Razones personales'];

  // Manejador de cambios en los campos
  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Manejador de envío
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos de disponibilidad y preferencias:', formData);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Disponibilidad y Preferencias</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Disponibilidad para viajar:</label>
          <select name="travelAvailability" value={formData.travelAvailability} onChange={handleInputChange} className="w-full p-2 border rounded">
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Disponibilidad para comenzar a trabajar:</label>
          <select name="workAvailability" value={formData.workAvailability} onChange={handleInputChange} className="w-full p-2 border rounded">
            <option value="">Seleccione</option>
            {workAvailabilityOptions.map(option => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>

        <div>
          <label className="block font-medium">Pretensión Salarial:</label>
          <select name="salaryExpectation" value={formData.salaryExpectation} onChange={handleInputChange} className="w-full p-2 border rounded">
            <option value="">Seleccione</option>
            {salaryRanges.map(range => <option key={range} value={range}>{range}</option>)}
          </select>
        </div>

        <div>
          <label className="block font-medium">¿Trabajas actualmente?</label>
          <select name="currentlyWorking" value={formData.currentlyWorking} onChange={handleInputChange} className="w-full p-2 border rounded">
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        {formData.currentlyWorking === 'Sí' && (
          <div>
            <label className="block font-medium">Motivo del retiro:</label>
            <select name="reasonForLeaving" value={formData.reasonForLeaving} onChange={handleInputChange} className="w-full p-2 border rounded">
              <option value="">Seleccione</option>
              {reasonsForLeaving.map(reason => <option key={reason} value={reason}>{reason}</option>)}
            </select>
          </div>
        )}

        <div>
          <label className="block font-medium">¿Por qué quieres trabajar con nosotros?</label>
          <textarea name="motivation" value={formData.motivation} onChange={handleInputChange} className="w-full p-2 border rounded" rows={4} required></textarea>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Guardar</button>
      </form>
    </div>
  );
};

export default Preferences;
