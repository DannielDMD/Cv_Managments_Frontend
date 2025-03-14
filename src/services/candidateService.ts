import api from "../utils/api";


export const getCiudades = async (): Promise<{ id_ciudad: number; nombre_ciudad: string; }[]> => {
    try {
        const response = await api.get("/ciudades");
        return response.data as { id_ciudad: number; nombre_ciudad: string; }[];
    } catch (error: unknown) {
        if (error instanceof Error && "response" in error) { // Verifica si tiene respuesta
            console.error("Error de red o del servidor al obtener las ciudades:", error.message);
        } else {
            console.error("Error inesperado al obtener las ciudades:", error);
        }
        throw error;
    }
};

export const getCategoriasCargo = async (): Promise<{ id_categoria: number; nombre_categoria: string; }[]> => {
    try {
        const response = await api.get("/categorias-cargo");
        return response.data as { id_categoria: number; nombre_categoria: string; }[];
    } catch (error: unknown) {
        if (error instanceof Error && "response" in error) {
            console.error("Error de red o del servidor al obtener las categorías de cargo:", error.message);
        } else {
            console.error("Error inesperado al obtener las categorías de cargo:", error);
        }
        throw error;
    }
};

export const getCargosPorCategoria = async (idCategoria: number): Promise<{ id_cargo: number; nombre_cargo: string; }[]> => {
    try {
        const response = await api.get(`/cargo-ofrecido/categoria/${idCategoria}`);
        return response.data as { id_cargo: number; nombre_cargo: string; }[];
    } catch (error: unknown) {
        if (error instanceof Error && "response" in error) {
            console.error(`Error de red o del servidor al obtener los cargos para la categoría ${idCategoria}:`, error.message);
        } else {
            console.error(`Error inesperado al obtener los cargos para la categoría ${idCategoria}:`, error);
        }
        throw error;
    }
};

export const postCandidato = async (candidatoData: unknown): Promise<void> => {
    try {
        const response = await api.post("/candidatos", candidatoData);
        console.log("Candidato registrado con éxito:", response.data);
    } catch (error) {
        console.error("Error al registrar el candidato:", error);
        throw error;
    }
};
