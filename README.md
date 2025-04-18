# MediPrompt

# 🩺 AI Diagnostic Report Generator

This is a Flask-based web application that generates **structured medical diagnostic reports** using natural language input. It leverages **Mistral via Ollama** for local inference and provides **live word-by-word streaming output** using **Socket.IO**.

---

## 🧠 Features

- 🔍 Accepts free-text patient data (age, symptoms, lab results, etc.)
- ⚙️ Generates structured diagnostic reports with:
  - Likely Diagnoses
  - Recommended Tests
  - Treatment Options
  - Follow-Up Recommendations
- ⏱️ Live word-by-word display (like ChatGPT-style typing)
- 📋 Copy report to clipboard
- 📄 Export report as PDF
- ✅ Optional checkbox to include lab data in the report

---

## 🚀 Demo Screenshot

![image](https://github.com/user-attachments/assets/a1968f3d-2621-49c0-8d25-fd74917eeb1c)
![image](https://github.com/user-attachments/assets/2907b3cc-2c6d-439f-a605-c22f4c866415)
![image](https://github.com/user-attachments/assets/d9b7fdfd-2b2d-4165-9059-c54822681cad)



---

## 🛠️ Tech Stack

- Python 3.10+
- Flask
- Flask-SocketIO
- Mistral via Ollama
- HTML/CSS/JS (Vanilla)
- [jsPDF](https://github.com/parallax/jsPDF) for PDF export

---

# 🧩 Setup Instructions

## 1. 🔁 Clone this repository

```bash
git clone https://github.com/Justreadingbro/MediPrompt.git
cd MediPrompt
```
## 2. 🐍 Create and activate a virtual environment (optional but recommended)
### Create virtual environment
python -m venv .venv

## Activate it
## On Windows:
```pyhton
.venv\Scripts\activate
```

## On macOS/Linux:
```bash
source .venv/bin/activate
```

## 3. 📦 Install dependencies
```python
pip install -r requirements.txt
```
## 4✅ Step-by-Step: Using .env for the Flask Secret Key
## 1. 🗝️ Create a .env file in your project root

```ini
# .env
FLASK_SECRET_KEY=your_super_secret_key_here
```

You can generate a random key like this:

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```
## 5. 🧠 Install Ollama and Mistral model
Ollama allows you to run LLMs locally.

### Step-by-step:
Download Ollama from [here](https://ollama.com/download)

Install it on your system (Windows, macOS, or Linux)

### Run the following command in your terminal to download the Mistral model:

```bash
ollama run mistral
```
⚠️ This will download the model (~4GB) the first time.

Once downloaded, leave this running or run it in another terminal tab.

## 6. ▶️ Run the Flask App
In your project folder:

```bash
python app.py
```
You should see something like:

```csharp
Running on http://127.0.0.1:5000
```
## 7. 🌐 Open in your browser
Visit: http://localhost:5000

Enter the patient data, and click "Generate Report". You’ll see a live, streaming diagnostic report generated by Mistral!

### 🧪 Example Input
```bash
45-year-old male
History of hypertension and high cholesterol
Lab results: LDL 160 mg/dL, HDL 38 mg/dL, BP 150/95
Complains of chest pain during exertion
```

# ⚠️ Notes
Ensure Ollama is running before generating reports.

This is for local/development use. Use proper production servers (e.g. gunicorn + nginx) for deployment.

The word-by-word streaming is simulated unless using Ollama's native streaming API (stream=True).



