from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)

# Configuración explícita de CORS para permitir solicitudes desde localhost:8100
CORS(app, resources={r"/*": {"origins": "http://localhost:8100"}})

# Claves de Transbank
TbkApiKeyId = "597055555532"
TbkApiKeySecret = "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C"
API_URL = "http://127.0.0.1:5000/"  # Asegúrate de que esta URL esté correcta para tu entorno de desarrollo

@app.route('/create_transaction', methods=['POST'])
def create_transaction():
    data = request.json  # Datos enviados por el cliente

    # Preparar los parámetros de la solicitud POST a Transbank
    payload = {
        "buy_order": data["buy_order"],
        "session_id": data["session_id"],
        "amount": data["amount"],
        "return_url": data["return_url"]
    }

    headers = {
        "Tbk-Api-Key-Id": TbkApiKeyId,
        "Tbk-Api-Key-Secret": TbkApiKeySecret,
        "Content-Type": "application/json"
    }

    # Realizar la solicitud POST a la API de Transbank para crear la transacción
    response = requests.post(
        'https://webpay3gint.transbank.cl/webpayserver/api/webpay/v1.2/transactions',
        json=payload,
        headers=headers
    )

    if response.status_code == 200:
        response_json = response.json()
        return jsonify({
            "token": response_json["token"],
            "url": response_json["url"]
        }), 200
    else:
        return jsonify({"error": "Error en la creación de la transacción"}), 400


@app.route('/commit_transaction/<token>', methods=['PUT'])
def commit_transaction(token):
    headers = {
        "Tbk-Api-Key-Id": TbkApiKeyId,
        "Tbk-Api-Key-Secret": TbkApiKeySecret,
        "Content-Type": "application/json"
    }

    # Realizar la solicitud PUT a la API de Transbank para confirmar la transacción
    response = requests.put(
        f'https://webpay3gint.transbank.cl/webpayserver/api/webpay/v1.2/transactions/{token}',
        headers=headers
    )

    if response.status_code == 200:
        response_json = response.json()
        return jsonify(response_json), 200
    else:
        return jsonify({"error": "Error al confirmar la transacción"}), 400


@app.route('/transaction_status/<token>', methods=['GET'])
def transaction_status(token):
    headers = {
        "Tbk-Api-Key-Id": TbkApiKeyId,
        "Tbk-Api-Key-Secret": TbkApiKeySecret,
        "Content-Type": "application/json"
    }

    # Realizar la solicitud GET a la API de Transbank para obtener el estado de la transacción
    response = requests.get(
        f'https://webpay3gint.transbank.cl/webpayserver/api/webpay/v1.2/transactions/{token}',
        headers=headers
    )

    if response.status_code == 200:
        response_json = response.json()
        return jsonify(response_json), 200
    else:
        return jsonify({"error": "Error al obtener el estado de la transacción"}), 400


@app.route('/refund_transaction/<token>', methods=['POST'])
def refund_transaction(token):
    data = request.json  # Datos enviados por el cliente
    payload = {
        "amount": data["amount"]
    }

    headers = {
        "Tbk-Api-Key-Id": TbkApiKeyId,
        "Tbk-Api-Key-Secret": TbkApiKeySecret,
        "Content-Type": "application/json"
    }

    # Realizar la solicitud POST a la API de Transbank para revertir la transacción
    response = requests.post(
        f'https://webpay3gint.transbank.cl/webpayserver/api/webpay/v1.2/transactions/{token}/refunds',
        json=payload,
        headers=headers
    )

    if response.status_code == 200:
        response_json = response.json()
        return jsonify(response_json), 200
    else:
        return jsonify({"error": "Error en la reversa de la transacción"}), 400


@app.route('/capture_transaction/<token>', methods=['PUT'])
def capture_transaction(token):
    data = request.json  # Datos enviados por el cliente
    buy_order = data.get("buy_order")  # Orden de compra
    authorization_code = data.get("authorization_code")  # Código de autorización
    capture_amount = data.get("capture_amount")  # Monto a capturar

    if not all([buy_order, authorization_code, capture_amount]):
        return jsonify({"error": "Faltan parámetros requeridos"}), 400

    payload = {
        "buy_order": buy_order,
        "authorization_code": authorization_code,
        "capture_amount": capture_amount
    }

    headers = {
        "Tbk-Api-Key-Id": TbkApiKeyId,
        "Tbk-Api-Key-Secret": TbkApiKeySecret,
        "Content-Type": "application/json"
    }

    # URL de la API de Transbank para capturar la transacción
    transbank_url = f'https://webpay3gint.transbank.cl/webpayserver/api/webpay/v1.2/transactions/{token}/capture'

    # Realizar la solicitud PUT a Transbank para capturar la transacción
    response = requests.put(
        transbank_url,
        json=payload,
        headers=headers
    )

    if response.status_code == 200:
        response_json = response.json()
        return jsonify(response_json), 200
    else:
        return jsonify({"error": "Error al capturar la transacción"}), 400


if __name__ == '__main__':
    app.run(debug=True)
