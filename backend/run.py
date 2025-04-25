from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)

# Configuración explícita de CORS para permitir solicitudes desde localhost:8100
CORS(app, resources={r"/*": {"origins": "http://localhost:8100"}})


# Claves de Transbank
TbkApiKeyId = "597055555532"
TbkApiKeySecret = "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C"
API_URL = "https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions"

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/pagar', methods=['POST'])
def transbank_pagar():
    """Inicia el proceso de pago con Transbank."""
    data = request.json
    buy_order = data.get("buy_order")
    session_id = data.get("session_id")
    amount = data.get("amount")
    return_url = "http://localhost:8100/retornopagar"

    if not all([buy_order, session_id, amount]):
        return jsonify({"error": "Faltan datos necesarios"}), 400

    headers = {
        'Tbk-Api-Key-Id': TbkApiKeyId,
        'Tbk-Api-Key-Secret': TbkApiKeySecret,
        'Content-Type': 'application/json'
    }
    payload = {
        "buy_order": buy_order,
        "session_id": session_id,
        "amount": amount,
        "return_url": return_url
    }

    response = requests.post(API_URL, json=payload, headers=headers)
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Error al procesar la transacción con Transbank"}), 500

@app.route('/retornopagar', methods=['GET'])
def retornopagar():
    """Verifica el estado de la transacción al recibir el token_ws."""
    token_ws = request.args.get('token_ws')
    if not token_ws:
        return jsonify({"error": "Token no recibido"}), 400

    # URL de verificación con token_ws
    verify_url = f"{API_URL}/{token_ws}"
    headers = {
        'Tbk-Api-Key-Id': TbkApiKeyId,
        'Tbk-Api-Key-Secret': TbkApiKeySecret,
        'Content-Type': 'application/json'
    }

    response = requests.get(verify_url, headers=headers)
    if response.status_code == 200:
        transbank_data = response.json()
        estado = transbank_data.get('status')

        if estado == 'AUTHORIZED':
            return jsonify({"status": "success", "message": "Pago autorizado", "data": transbank_data}), 200
        elif estado == 'REJECTED':
            return jsonify({"status": "failure", "message": "Pago rechazado", "data": transbank_data}), 400
        else:
            return jsonify({"status": "pending", "message": "Pago pendiente", "data": transbank_data}), 202
    else:
        return jsonify({"error": "Error al verificar el estado de la transacción"}), 500

if __name__ == '__main__':
    app.run(debug=True)
    
@app.route('/verificar_pago', methods=['GET'])
def verificar_pago():
    token_ws = request.args.get('token_ws')
    if not token_ws:
        return jsonify({"error": "Token no recibido"}), 400

    # URL de verificación con token_ws
    verify_url = f"{API_URL}/{token_ws}"
    headers = {
        'Tbk-Api-Key-Id': TbkApiKeyId,
        'Tbk-Api-Key-Secret': TbkApiKeySecret,
        'Content-Type': 'application/json'
    }

    response = requests.get(verify_url, headers=headers)
    if response.status_code == 200:
        transbank_data = response.json()
        estado = transbank_data.get('status')
        # Aquí puedes obtener el estado y otros datos, como el monto
        monto = transbank_data.get('amount')
        # Devolver la información relevante
        return jsonify({
            "status": estado,
            "amount": monto,
            "message": "Pago verificado",
            "data": transbank_data
        }), 200
    else:
        return jsonify({"error": "Error al verificar el estado de la transacción"}), 500



@app.after_request
def handle_cors_preflight(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:8100'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    return response