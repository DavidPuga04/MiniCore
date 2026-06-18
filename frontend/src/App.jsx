import { useState } from "react";
import { obtenerReporte } from "./api";

function App() {

  const [fechaInicio, setFechaInicio] =
    useState("");

  const [fechaFin, setFechaFin] =
    useState("");

  const [datos, setDatos] =
    useState([]);

  const consultar = async () => {

    if (!fechaInicio || !fechaFin) {
      alert(
        "Seleccione ambas fechas"
      );
      return;
    }

    try {

      const resultado =
        await obtenerReporte(
          fechaInicio,
          fechaFin
        );

      setDatos(resultado);

    } catch (error) {

      console.error(error);

      alert(
        "Error al obtener el reporte"
      );
    }
  };

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1>
        Reporte de Costos por Repartidor
      </h1>

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) =>
            setFechaInicio(
              e.target.value
            )
          }
        />

        <input
          type="date"
          value={fechaFin}
          onChange={(e) =>
            setFechaFin(
              e.target.value
            )
          }
          style={{
            marginLeft: "10px",
          }}
        />

        <button
          onClick={consultar}
          style={{
            marginLeft: "10px",
          }}
        >
          Consultar
        </button>
      </div>

      <table
        border="1"
        cellPadding="8"
      >
        <thead>
          <tr>
            <th>Repartidor</th>
            <th>Envíos</th>
            <th>Total Kg</th>
            <th>Zonas</th>
            <th>Tarifa/Kg</th>
            <th>Costo Total</th>
          </tr>
        </thead>

        <tbody>

          {datos.length > 0 ? (

            datos.map(
              (
                item,
                index
              ) => (
                <tr key={index}>
                  <td>
                    {
                      item.repartidor
                    }
                  </td>

                  <td>
                    {
                      item.cantidad_envios
                    }
                  </td>

                  <td>
                    {
                      item.total_kg
                    }
                  </td>

                  <td>
                    {
                      item.zonas
                    }
                  </td>

                  <td>
                    {
                      item.tarifas
                    }
                  </td>

                  <td>
                    $
                    {
                      item.costo_total
                    }
                  </td>
                </tr>
              )
            )

          ) : (

            <tr>
              <td
                colSpan="6"
                align="center"
              >
                No hay datos
              </td>
            </tr>

          )}

        </tbody>
      </table>
    </div>
  );
}

export default App;