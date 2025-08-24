from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import os

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load model once
model = load_model("best_model.keras")

def predict_image(img_path):
    try:
        img = Image.open(img_path).convert("RGB")
        img = img.resize((150, 150))
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        prediction = model.predict(img_array)
        class_index = int(np.round(prediction[0][0]))
        return "Pneumonia" if class_index == 1 else "Normal"
    except Exception as e:
        print("Error in predict_image:", e)
        return None

@app.route("/predict", methods=["POST"])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    file = request.files['file']
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)
    print(f"Saved file at: {filepath}")
    result = predict_image(filepath)
    print(f"Prediction result: {result}")

    if result is None:
        return jsonify({"error": "Prediction failed"}), 500
    return jsonify({"prediction": result})

if __name__ == "__main__":
    app.run(debug=True)
