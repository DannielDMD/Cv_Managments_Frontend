import React, { useState } from "react";
import InputField from "../components/form/InputField";
import SelectField from "../components/form/SelectField"; // Importamos el nuevo SelectField
import { getCargosPorCategoria, getCiudades, postCandidato } from "../services/candidateService"; // Importamos la función que obtiene ciudades
import { getCategoriasCargo } from "../services/candidateService";


const PersonalInfo: React.FC = () => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    cc: "",
    fechaNacimiento: "",
    telefono: "",
    perfil: "",
    trabajaJoyco: "",
    haTrabajadoJoyco: "",
    tieneReferido: "",
    ciudadResidencia: null as Ciudad | null, // 🔹 Guarda el objeto completo o null
    categoriaCargo: null as CategoriaCargo | null,
    cargoPostulado: null as Cargo | null, // ✅ Ahora acepta null o un objeto Cargo
    //cargo: null as CargoOfrecido | null,
  });
  const [cargos, setCargos] = useState<{ id_cargo: number; nombre_cargo: string; }[]>([]);
  // Manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Definir el tipo esperado del select
  interface Ciudad {
    id_ciudad: number;
    nombre_ciudad: string;
  }

  const handleCityChange = (selectedOption: Ciudad | null) => {
    setFormData((prev) => ({
      ...prev,
      ciudadResidencia: selectedOption, // 🔹 Guardamos el objeto completo
    }));
  };
  interface Cargo {
    id_cargo: number;
    nombre_cargo: string;
  }
  //Select para categoria
  interface CategoriaCargo {
    id_categoria: number;
    nombre_categoria: string;
  }
  const handleCategoriaChange = async (selectedOption: CategoriaCargo | null) => {
    setFormData((prev) => ({
      ...prev,
      categoriaCargo: selectedOption, // Guardamos la categoría seleccionada
      cargoPostulado: null, // 🔹 Reseteamos el cargo seleccionado al cambiar la categoría
    }));

    if (selectedOption) {
      try {
        const cargosData = await getCargosPorCategoria(selectedOption.id_categoria);
        setCargos(cargosData); // 🔹 Actualizamos la lista de cargos
      } catch (error) {
        console.error("Error al cargar los cargos:", error);
        setCargos([]); // 🔹 Si falla, vaciamos la lista de cargos
      }
    } else {
      setCargos([]); // Si la categoría es null, limpiamos la lista
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validaciones básicas
    if (!formData.nombre || !formData.email || !formData.cc) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      const candidatoData = {
        nombre_completo: formData.nombre,
            correo_electronico: formData.email,
            cc: formData.cc,
            fecha_nacimiento: formData.fechaNacimiento 
                ? new Date(formData.fechaNacimiento).toISOString().split("T")[0] 
                : null,
            telefono: formData.telefono || null,
            id_ciudad: formData.ciudadResidencia ? formData.ciudadResidencia.id_ciudad : null,
            descripcion_perfil: formData.perfil || null,
            id_categoria_cargo: formData.categoriaCargo ? formData.categoriaCargo.id_categoria : null,
            id_cargo: formData.cargoPostulado ? formData.cargoPostulado.id_cargo : null,
            trabaja_actualmente_joyco: formData.trabajaJoyco === "Sí",
            ha_trabajado_joyco: formData.haTrabajadoJoyco === "Sí",
            id_motivo_salida: null, // Puedes cambiar esto si necesitas enviar un valor
            tiene_referido: formData.tieneReferido === "Sí",
            nombre_referido: null // Agregar si el usuario tiene un referido
      };
      console.log("Datos enviados al backend:", candidatoData);
      await postCandidato(candidatoData);
      alert("Candidato registrado con éxito");

      setFormData({
        nombre: "",
        email: "",
        cc: "",
        fechaNacimiento: "",
        telefono: "",
        perfil: "",
        trabajaJoyco: "",
        haTrabajadoJoyco: "",
        tieneReferido: "",
        ciudadResidencia: null,
        categoriaCargo: null,
        cargoPostulado: null,
      });
    } catch (error) {
      alert("Error al registrar el candidato, revisa la consola.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Información Personal</h2>

      <form onSubmit={handleSubmit}>
        <InputField label="Nombre Completo" name="nombre" type="text" value={formData.nombre} onChange={handleChange} />

        <InputField label="Correo Electrónico" name="email" type="email" value={formData.email} onChange={handleChange} />

        <InputField label="C.C." name="cc" type="text" value={formData.cc} onChange={handleChange} />

        <InputField label="Fecha de Nacimiento" name="fechaNacimiento" type="date" value={formData.fechaNacimiento} onChange={handleChange} />

        <InputField label="Teléfono" name="telefono" type="tel" value={formData.telefono} onChange={handleChange} />

        <InputField label="Descripción del Perfil" name="perfil" type="text" value={formData.perfil} onChange={handleChange} />

        <SelectField<Ciudad>
          fetchFunction={getCiudades}
          value={formData.ciudadResidencia}
          onChange={handleCityChange}
          label="Ciudad de Residencia"
          idKey="id_ciudad"
          nameKey="nombre_ciudad"
        />


        <SelectField
          label="Categoría de Cargo"
          fetchFunction={getCategoriasCargo}
          idKey="id_categoria"
          nameKey="nombre_categoria"
          value={formData.categoriaCargo}
          onChange={handleCategoriaChange}
        />

        {/* 🔹 Este SelectField solo aparece si hay cargos disponibles */}
        {cargos.length > 0 && (
          <SelectField
            label="Cargo al que se postula"
            fetchFunction={async () => cargos} // 🔹 Usamos la lista filtrada
            idKey="id_cargo"
            nameKey="nombre_cargo"
            value={formData.cargoPostulado}
            onChange={(selectedOption) => setFormData((prev) => ({
              ...prev,
              cargoPostulado: selectedOption, // 🔹 Guardamos el cargo seleccionado
            }))}
          />
        )}


        <InputField label="Trabaja actualmente en Joyco?" name="trabajaJoyco" type="select" value={formData.trabajaJoyco} onChange={handleChange} />

        <InputField label="Ha trabajado en Joyco?" name="haTrabajadoJoyco" type="select" value={formData.haTrabajadoJoyco} onChange={handleChange} />

        <InputField label="Tiene Referido?" name="tieneReferido" type="select" value={formData.tieneReferido} onChange={handleChange} />

        <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default PersonalInfo;
