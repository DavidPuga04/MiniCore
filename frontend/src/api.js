import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const obtenerReporte = async (fechaInicio, fechaFin) => {
  const response = await axios.get(
    `${API_URL}/reporte-costos/`,
    {
      params: {
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
      },
    }
  );

  return response.data;
};