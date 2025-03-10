import { useState } from "react";

// Definir tipos
type NivelEducativo = "Primaria sin terminar" | "Primaria" | "Secundaria sin terminar" | "Secundaria" | "Técnico" | "Tecnólogo" | "Profesional" | "Especialización" | "Maestría" | "Doctorado";
type NivelIngles = "Básico" | "Intermedio" | "Avanzado" | "Fluido";

const Education = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    nivelEducativo: "",
    titulo: "",
    institucion: "",
    añoGraduacion: "",
    nivelIngles: ""
  });

  // Mapeo de niveles educativos a títulos disponibles
  const titulosPorNivel: Record<NivelEducativo, string[]> = {
    "Primaria sin terminar": [],
    "Primaria": [],
    "Secundaria sin terminar": [],
    "Secundaria": [],
    "Técnico": ["Técnico en Sistemas", "Técnico en Contabilidad", "Técnico en Administración"],
    "Tecnólogo": ["Tecnólogo en Sistemas", "Tecnólogo en Gestión Empresarial", "Tecnólogo en Logística"],
    "Profesional": ["Ingeniero de Sistemas", "Ingeniero Civil", "Administrador de Empresas", "Contador Público", "Abogado"],
    "Especialización": ["Especialista en Gerencia de Proyectos", "Especialista en Finanzas", "Especialista en Recursos Humanos"],
    "Maestría": ["Magister en Administración", "Magister en Ingeniería", "Magister en Educación"],
    "Doctorado": ["Doctor en Ciencias", "Doctor en Ingeniería", "Doctor en Administración"]
  };

  // Lista de instituciones académicas
  const instituciones = [
    "Universidad Nacional de Colombia",
    "Universidad de los Andes",
    "Universidad Javeriana",
    "Universidad Externado",
    "Universidad del Rosario",
    "SENA",
    "Universidad de Antioquia",
    "Universidad del Valle",
    "Universidad Industrial de Santander",
    "Otra"
  ];

  // Niveles de inglés
  const nivelesIngles: NivelIngles[] = ["Básico", "Intermedio", "Avanzado", "Fluido"];

  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Si cambia el nivel educativo, resetear título e institución
    if (name === "nivelEducativo") {
      const nivel = value as NivelEducativo;
      const requiereTitulo = ["Técnico", "Tecnólogo", "Profesional", "Especialización", "Maestría", "Doctorado"].includes(nivel);
      
      setFormData({
        ...formData,
        [name]: value,
        titulo: "",
        institucion: requiereTitulo ? formData.institucion : ""
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Verificar si el nivel educativo requiere título e institución
  const requiereTitulo = () => {
    return ["Técnico", "Tecnólogo", "Profesional", "Especialización", "Maestría", "Doctorado"].includes(formData.nivelEducativo as NivelEducativo);
  };

  // Generar años para el selector (desde 1970 hasta el año actual)
  const generarAños = () => {
    const añoActual = new Date().getFullYear();
    const años = [];
    for (let año = añoActual; año >= 1970; año--) {
      años.push(año);
    }
    return años;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Educación</h3>
      <form className="space-y-4 max-h-[600px] overflow-y-auto">
        {/* Nivel de estudio máximo alcanzado */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nivel de estudio máximo alcanzado:</label>
          <select
            name="nivelEducativo"
            value={formData.nivelEducativo}
            onChange={handleChange}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          >
            <option value="">Seleccione un nivel educativo</option>
            {Object.keys(titulosPorNivel).map((nivel) => (
              <option key={nivel} value={nivel}>{nivel}</option>
            ))}
          </select>
        </div>
        
        {/* Título Obtenido (condicional) */}
        {requiereTitulo() && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Título Obtenido:</label>
            <select
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
            >
              <option value="">Seleccione un título</option>
              {formData.nivelEducativo && 
                (titulosPorNivel[formData.nivelEducativo as NivelEducativo] || []).map((titulo: string) => (
                  <option key={titulo} value={titulo}>{titulo}</option>
                ))
              }
            </select>
          </div>
        )}
        
        {/* Institución Académica (condicional) */}
        {requiereTitulo() && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Institución Académica:</label>
            <select
              name="institucion"
              value={formData.institucion}
              onChange={handleChange}
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
            >
              <option value="">Seleccione una institución</option>
              {instituciones.map((institucion) => (
                <option key={institucion} value={institucion}>{institucion}</option>
              ))}
            </select>
          </div>
        )}
        
        {/* Año de Graduación */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Año de Graduación:</label>
          <select
            name="añoGraduacion"
            value={formData.añoGraduacion}
            onChange={handleChange}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          >
            <option value="">Seleccione un año</option>
            {generarAños().map((año) => (
              <option key={año} value={año}>{año}</option>
            ))}
          </select>
        </div>
        
        {/* Nivel de Inglés */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nivel de Inglés:</label>
          <select
            name="nivelIngles"
            value={formData.nivelIngles}
            onChange={handleChange}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          >
            <option value="">Seleccione su nivel de inglés</option>
            {nivelesIngles.map((nivel) => (
              <option key={nivel} value={nivel}>{nivel}</option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default Education;