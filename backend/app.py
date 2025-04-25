from flask import Flask , request, jsonify
import pandas as pd
from flask_cors import CORS
from datetime import date, timedelta

app = Flask(__name__)
CORS(app)
VALID_RANGES = {15, 30, 60}

@app.route('/api/demanda', methods=['GET'])
def demanda():
    rute_csv = "demanda_sin_dia.csv"

    range_days = int(request.args.get('range')) 
    if range_days not in VALID_RANGES:
        return jsonify({
            "error": "Parámetro 'range' obligatorio y debe ser uno de: 15, 30, 60"
        }), 400
    
    df = pd.read_csv(rute_csv)
    df['Date'] = pd.to_datetime(df['Date'], format='%Y-%m-%d', errors='coerce') 
    

    # Filtrar filas con fechas no válidas
    df = df.dropna(subset=['Date'])

    fecha_final = date.today()
    fecha_inicio = fecha_final - timedelta(days=range_days)
    
    filtered = df[
        (df['Date'].dt.date >= fecha_inicio) & 
        (df['Date'].dt.date <= fecha_final)]

    
    result = (
        filtered[['Date', 'Value']]
        .rename(columns={'Date': 'date', 'Value': 'value'})
        .sort_values('date')  # opcional: orden cronológico ascendente
        .assign(date=lambda d: d['date'].dt.strftime('%Y-%m-%d'))
        .to_dict(orient='records')
    )
    return jsonify(result),200

if __name__ == '__main__':
    # En producción quita debug=True
    app.run(host='0.0.0.0', port=5000, debug=True)