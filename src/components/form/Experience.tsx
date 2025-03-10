import React, { useState } from 'react';

type ExperienceRange = 'Sin experiencia' | '0-1 años' | '1-3 años' | '3-5 años' | '5-10 años' | 'Más de 10 años';

interface ExperienceFormData {
  experienceRange: ExperienceRange;
  lastCompany: string;
  lastPosition: string;
  functions: string;
  startDate: string;
  endDate: string;
  totalTime: string;
}

const Experience: React.FC = () => {
  const [formData, setFormData] = useState<ExperienceFormData>({
    experienceRange: 'Sin experiencia',
    lastCompany: '',
    lastPosition: '',
    functions: '',
    startDate: '',
    endDate: '',
    totalTime: '',
  });

  const experienceRanges: ExperienceRange[] = [
    'Sin experiencia',
    '0-1 años',
    '1-3 años',
    '3-5 años',
    '5-10 años',
    'Más de 10 años',
  ];

  const calculateTotalTime = (start: string, end: string): string => {
    if (!start || !end) return '';
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return '';
    const diffInMs = endDate.getTime() - startDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffInDays / 365);
    const months = Math.floor((diffInDays % 365) / 30);
    if (years > 0 && months > 0) return `${years} año${years !== 1 ? 's' : ''} y ${months} mes${months !== 1 ? 'es' : ''}`;
    if (years > 0) return `${years} año${years !== 1 ? 's' : ''}`;
    if (months > 0) return `${months} mes${months !== 1 ? 'es' : ''}`;
    return `${diffInDays} día${diffInDays !== 1 ? 's' : ''}`;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prevData => {
      const newData = { ...prevData, [name]: value };
      if (name === 'startDate' || name === 'endDate') {
        newData.totalTime = calculateTotalTime(
          name === 'startDate' ? value : prevData.startDate,
          name === 'endDate' ? value : prevData.endDate
        );
      }
      return newData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos de experiencia laboral:', formData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Experiencia Laboral</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600">Experiencia:</label>
          <select
            name="experienceRange"
            value={formData.experienceRange}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            {experienceRanges.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-600">Última empresa:</label>
          <input
            type="text"
            name="lastCompany"
            value={formData.lastCompany}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600">Último cargo:</label>
          <input
            type="text"
            name="lastPosition"
            value={formData.lastPosition}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600">Funciones:</label>
          <textarea
            name="functions"
            value={formData.functions}
            onChange={handleInputChange}
            rows={4}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600">Fecha de inicio:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600">Fecha de finalización:</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-600">Tiempo total trabajado:</label>
          <input
            type="text"
            name="totalTime"
            value={formData.totalTime}
            readOnly
            className="w-full border rounded-lg p-2 mt-1 bg-gray-100"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};

export default Experience;
