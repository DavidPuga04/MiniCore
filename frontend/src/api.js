import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const obtenerReporte = async (
  fechaInicio,
  fechaFin
) => {

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