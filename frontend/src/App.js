import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'


export default function App() {
  const [range, setRange] = useState(15);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/demanda?range=${range}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        return res.json();
      })
      .then(json => setData(json))
      .catch(err => {
        console.error("Fetch error:", err);
        setData([]);
      })
      .finally(() => setLoading(false))
  }, [range])

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Dashboard de Demanda</h1>

      {/* Selector de rango */}
      <label className="block mb-2">
        Mostrar últimos{' '}
        <select
          value={range}
          onChange={e => setRange(Number(e.target.value))}
          className="border px-2 py-1"
        >
          {[15, 30, 60].map(d => (
            <option key={d} value={d}>{d} días</option>
          ))}
        </select>
      </label>

      {loading ? (
        <p>Cargando datos…</p>
      ) : data.length === 0 ? (
        <p>No hay datos para mostrar.</p>
      ) : (
        <>
          {/* Gráfico de líneas */}
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" name="Demanda" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Tabla de datos */}
          <div className="table-wrapper mt-4">
            <table className="excel-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Demanda</th>
                </tr>
              </thead>
              <tbody>
                {data.map(({ date, value }) => (
                  <tr key={date}>
                    <td>{date}</td>
                    <td>{value.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}