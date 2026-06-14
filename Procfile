"""
app.py - Servidor Flask para el Comparador Financiero del Perú
Sirve la interfaz web y la API de tasas de interés en tiempo real.
"""
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import threading
import time
import logging
from scraper import FinancialScraper

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# ── Inicializar scraper ──────────────────────────────────────────────────────
scraper = FinancialScraper()
UPDATE_INTERVAL = 30  # segundos


def background_updater():
    """Hilo en segundo plano que actualiza las tasas cada 30 segundos."""
    while True:
        time.sleep(UPDATE_INTERVAL)
        try:
            scraper.update_rates()
            logger.info("Tasas actualizadas correctamente.")
        except Exception as e:
            logger.error(f"Error al actualizar tasas: {e}")


# Iniciar hilo de actualización
updater_thread = threading.Thread(target=background_updater, daemon=True)
updater_thread.start()
logger.info("Hilo de actualización iniciado — cada 30 segundos.")


# ── Rutas ─────────────────────────────────────────────────────────────────────
@app.route("/")
def index():
    """Página principal — interfaz del comparador."""
    return render_template("index.html")


@app.route("/api/rates")
def api_rates():
    """
    GET /api/rates?period=360
    Retorna todas las tasas de interés para el período indicado.
    Períodos válidos: 30, 60, 90, 180, 360
    """
    period = request.args.get("period", "360")
    if period not in ["30", "60", "90", "180", "360"]:
        return jsonify({"error": "Período no válido. Use: 30, 60, 90, 180, 360"}), 400
    return jsonify(scraper.get_all_rates(period))


@app.route("/api/calculate")
def api_calculate():
    """
    GET /api/calculate?amount=5000&period=360
    Calcula ganancias proyectadas para todas las entidades.
    """
    try:
        amount = float(request.args.get("amount", 1000))
        period = request.args.get("period", "360")

        if amount <= 0:
            return jsonify({"error": "El monto debe ser mayor a 0"}), 400
        if period not in ["30", "60", "90", "180", "360"]:
            return jsonify({"error": "Período no válido"}), 400

        days_map = {"30": 30, "60": 60, "90": 90, "180": 180, "360": 360}
        days = days_map[period]

        data = scraper.get_all_rates(period)
        results = []
        for inst in data["institutions"]:
            rate = inst["rate"]
            calc = scraper.calculate_earnings(amount, days, rate)
            results.append({
                **inst,
                "amount_invested": amount,
                "days": days,
                "earning": calc["earning"],
                "total": calc["total"],
                "net_after_tax": calc["net_after_tax"],
            })

        # Ordenar por ganancia descendente
        results.sort(key=lambda x: x["earning"], reverse=True)
        for i, r in enumerate(results):
            r["rank"] = i + 1

        return jsonify({
            "results": results,
            "amount": amount,
            "period": period,
            "days": days,
            "timestamp": data["timestamp"],
            "reference_rate": data["reference_rate"],
            "source": data["source"],
        })

    except ValueError as e:
        return jsonify({"error": f"Parámetro inválido: {e}"}), 400


@app.route("/api/best")
def api_best():
    """
    GET /api/best?period=360
    Retorna la mejor tasa por tipo de entidad.
    """
    period = request.args.get("period", "360")
    return jsonify(scraper.get_best_by_type(period))


@app.route("/api/status")
def api_status():
    """Estado del sistema."""
    return jsonify({
        "status": "online",
        "last_update": scraper.last_update.isoformat() if scraper.last_update else None,
        "total_institutions": len(scraper.institutions),
        "update_interval_seconds": UPDATE_INTERVAL,
        "source": "SBS Perú / BCRP / Entidades Financieras",
    })


# ── Entry point ───────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("\n" + "="*60)
    print("  COMPARADOR FINANCIERO DEL PERU")
    print("  Servidor: http://localhost:5000")
    print("  Actualizacion cada 30 segundos")
    print("  Fuente: SBS Peru / BCRP")
    print("="*60 + "\n")
    app.run(debug=False, host="0.0.0.0", port=5000, use_reloader=False)
