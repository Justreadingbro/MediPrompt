import os
import time
import requests
from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask and SocketIO
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def handle_connect():
    print("Client connected")
    # Send a welcome token so the client knows the connection works.
    emit('report_token', {'data': 'Connected! '})

@socketio.on('generate_report')
def handle_generate_report(data):
    print("Received generate_report with data:", data)
    patient_info = data.get('patient_info', '')
    include_lab = data.get('include_lab', False)

    prompt = (
        "Generate a structured diagnostic report in the following format:\n\n"
        "Likely Diagnoses:\n- \n\n"
        "Recommended Confirmatory Tests:\n- \n\n"
        "Treatment Options:\n- \n\n"
        "Follow-Up Recommendations:\n- \n\n"
        "Do NOT assume any symptoms or values that are not explicitly stated. Use only the given information.\n\n"
        "Patient Information:\n" + patient_info + "\n\n"
    )

    try:
        # Call Ollama's API to generate the report using the Mistral model.
        # Ensure Ollama is running: run `ollama run mistral` in a separate terminal.
        response = requests.post("http://localhost:11434/api/generate", json={
            "model": "mistral",
            "prompt": prompt,
            "stream": False
        })
        if response.status_code != 200:
            emit('report_error', {'error': f"Ollama API error: {response.text}"})
            return

        complete_text = response.json()["response"].strip()
        print("Full generated text:", complete_text)
        # Simulate streaming by splitting text into words.
        words = complete_text.split()
        for word in words:
            emit('report_token', {'data': word}, broadcast=False)
            time.sleep(0.3)  # Adjust this delay as needed.
        emit('report_complete', {'data': 'Report generation complete'})
    except Exception as e:
        emit('report_error', {'error': str(e)})

if __name__ == "__main__":
    socketio.run(app, debug=True)
