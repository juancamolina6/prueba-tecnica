# 🧪 Prueba Técnica - Visualización de Demanda Energética

Este proyecto consiste en crear un sistema de visualización de la demanda de energía del país. Se compone de dos partes:

- Una **API Backend** en Python (Flask u otra libreria) que lee los datos desde un archivo CSV.
- Un **Dashboard Frontend** en React que consume la API y presenta los datos con filtros de tiempo.

---

## 📁 Estructura del Proyecto

```
/backend
  └── app.py
  └── demanda_sin_dia.csv
  └── requirements.txt

/frontend
  └── src/
      └── components/
      └── App.jsx
  └── package.json
  └── README.md
```

---

## 📊 Datos

El CSV contiene los siguientes campos:

- `Date` (formato YYYY-MM-DD): Fecha de la demanda.
- `Id`: Identificador único del registro.
- `Value`: Valor de la demanda energética (por ejemplo, en kWh).

Ejemplo:

```csv
Date,Id,Value
2024-01-01,Sistema,30500
2024-01-02,Sistema,31000
...
```

---

## 🖥️ Parte 1 - Backend (Flask)

### 🎯 Requisitos

- Python 3.8+
- Flask u otra libreria

### 📡 Endpoints

#### `GET /api/demanda?range=15|30|60`

Devuelve los datos de demanda filtrados por fecha a partir de hoy hacia atrás, según el rango de días indicado (`15`, `30` o `60`).

- **Parámetros:**  
  `range` (obligatorio): número de días hacia atrás desde hoy.

- **Respuesta (JSON):**

```json
[
  {
    "date": "2024-03-01",
    "value": 32800
  },
  ...
]
```

---

## 🌐 Parte 2 - Frontend (React)

### 🎯 Requisitos

- Node.js 18+
- React/Vite

### 🧩 Funcionalidades

- Selector de rango de fechas: 15, 30, 60 días.
- Llamada a la API para obtener los datos correspondientes.
- Visualización de los datos en una gráfica o tabla (a elección del candidato).
- Diseño simple pero funcional.
---

## ✅ Criterios de Evaluación

1. **Funcionalidad completa** según lo solicitado.
2. **Limpieza y estructura** del código.
3. **Uso adecuado de tecnologías** (Flask, React).
4. **Buenas prácticas** en desarrollo web y API REST.
5. **Manejo correcto de fechas y filtrado**.
6. Bonus: uso de gráficos para visualizar la demanda (ej. con Chart.js o Recharts).

---

## 📝 Instrucciones para Entrega

1. Sube tu proyecto a un repositorio público (GitHub, GitLab, etc.).
2. Realizar un pull-requests al repositorio base con tu solución
3. Asegúrate de que las instrucciones de instalación y ejecución estén claras y funcionen.
