import { useState } from "react";
// Definimos los tipos para evitar errores de TypeScript
type CategoriaType = "Administrativo" | "Técnico" | "Operativo";

const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    idNumber: "",
    age: "",
    phone: "",
    city: "",
    profile: "",
    category: "",
    position: "",
    workAtJoyco: "",
    workedAtJoyco: "no",
    motivoSalida: "",
    referidoNombre: "",
    knowsSomeoneAtJoyco: "no"
  });

  {/*CONSTANTE PARA LA FECHA DE NACIMIENTO*/ }
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  // Definir las categorías y cargos
  const cargosPorCategoria: Record<CategoriaType, string[]> = {
    "Administrativo": ["Asistente Administrativo", "Coordinador Administrativo", "Analista Contable"],
    "Técnico": ["Ingeniero de Proyectos", "Técnico de Campo", "Supervisor Técnico"],
    "Operativo": ["Operador de Equipos", "Conductor", "Auxiliar de Obras"]
  };


  {/*Función para calcular la edad a partir de la fecha de nacimiento*/ }
  const calcularEdad = (fecha: string) => {
    if (!fecha) return "";
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };





  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Si cambia la categoría, resetear la posición
    if (name === "category") {
      setFormData({
        ...formData,
        [name]: value,
        position: "" // Reset position when category changes
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (

    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Información Personal</h3>
      <form className="space-y-4 max-h-[600px] overflow-y-auto">
        {/*Nombre Completo*/}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre Completo:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>
        {/*Email*/}
        <div>
          <label className="block text-sm font-medium text-gray-700">Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>
        {/*Cedula*/}
        <div>
          <label className="block text-sm font-medium text-gray-700">Número de Cédula:</label>
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>
        {/* EDAD | FECHA DE NACIMIENTO*/}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Fecha de Nacimiento</label>
          <input
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/*CALCULO DE LA EDAD*/}
          {/* Muestra la edad calculada automáticamente */}
          {fechaNacimiento && (
            <p className="text-gray-700 mt-2">
              Edad: <span className="font-semibold">{calcularEdad(fechaNacimiento)} años</span>
            </p>
          )}
        </div>
        {/*Telefono*/}
        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>
        {/*Ciudad de Residencia*/}
        <div>
          <label className="block text-sm font-medium text-gray-700">Ciudad de Residencia:</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          >
            <option value="">Seleccione una ciudad</option>
            <option value="Bogotá">Bogotá</option>
            <option value="Medellín">Medellín</option>
            <option value="Cali">Cali</option>
          </select>
        </div>
        {/*DESCRIPCIÓN DEL PERFIL*/}
        <div>
          <label className="block text-sm font-medium text-gray-700">Perfil:</label>
          <input
            type="text"
            name="profile"
            value={formData.profile}
            onChange={handleChange}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>
        {/*CATEGORÍA AL CARGO AL QUE SE POSTULA*/}
        <div>
          <label className="block text-sm font-medium text-gray-700">Categoría al cargo que se postula:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          >
            <option value="">Seleccione una categoría</option>
            {Object.keys(cargosPorCategoria).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        {/*CARGO AL QUE SE POSTULA*/}
        <div>
          <label className="block text-sm font-medium text-gray-700">Cargo al que se postula:</label>
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
            disabled={!formData.category} // Deshabilitar si no hay categoría seleccionada
          >
            <option value="">Seleccione un cargo</option>
            {formData.category &&
              (cargosPorCategoria[formData.category as CategoriaType] || []).map((cargo: string) => (
                <option key={cargo} value={cargo}>{cargo}</option>
              ))
            }
          </select>
        </div>
        {/*TRABAJAS EN JOYCO*/}
        <div>
          <label className="block text-sm font-medium text-gray-700">¿Actualmente trabajas en Joyco?</label>
          <select
            name="workAtJoyco"
            value={formData.workAtJoyco}
            onChange={handleChange}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          >
            <option value="no">No</option>
            <option value="yes">Sí</option>
          </select>
        </div>

        {/* HAS TRABAJADO EN JOYCO*/}
        <div>
          <label className="block text-sm font-medium text-gray-700">¿Has trabajado en Joyco?</label>
          <select
            name="workedAtJoyco"
            value={formData.workedAtJoyco}
            onChange={handleChange}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          >
            <option value="no">No</option>
            <option value="yes">Sí</option>
          </select>
        </div>

        {/* Motivo de salida (solo si la respuesta es "Sí") */}
        {formData.workedAtJoyco === "yes" && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Motivo de salida</label>
            <input
              type="text"
              name="motivoSalida"
              value={formData.motivoSalida || ""}
              onChange={handleChange}
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
              placeholder="Escribe el motivo de salida..."
            />
          </div>
        )}

        {/* ¿CONOCES A ALGUIEN EN JOYCO? */}
        <div>
          <label className="block text-sm font-medium text-gray-700">¿Conoces a alguien en Joyco?</label>
          <select
            name="knowsSomeoneAtJoyco"
            value={formData.knowsSomeoneAtJoyco}
            onChange={handleChange}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          >
            <option value="no">No</option>
            <option value="yes">Sí</option>
          </select>
        </div>

        {/* NOMBRE DEL REFERIDO (solo si la respuesta es "Sí") */}
        {formData.knowsSomeoneAtJoyco === "yes" && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Nombre del referido</label>
            <input
              type="text"
              name="referidoNombre"
              value={formData.referidoNombre || ""}
              onChange={handleChange}
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
              placeholder="Escribe el nombre del referido..."
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default PersonalInfo;
