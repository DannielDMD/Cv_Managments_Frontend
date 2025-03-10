import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormStepper from "../components/form/FormStepper";
import Header from "../components/form/header";

const Form = () => {
  const navigate = useNavigate();
  const [isFinalStep, setIsFinalStep] = useState(false);

  const handleSubmit = () => {
    navigate("/", { state: { success: true } });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 pt-20"> 
      {/* pt-20 para evitar que el contenido quede oculto tras el header */}
      
      <Header /> {/* Agregar el header fijo */}

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-4xl relative">
        <FormStepper setIsFinalStep={setIsFinalStep} />

        <div className="flex justify-end mt-4">
          <button 
            className={`px-4 py-2 rounded-lg shadow-md ${
              isFinalStep ? "bg-blue-700 text-white hover:bg-blue-800" : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`} 
            disabled={!isFinalStep}
            onClick={handleSubmit}
          >
            Guardar y Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;