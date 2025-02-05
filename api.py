from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from xgboost import XGBRegressor
import warnings
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all domains

# Suppress warnings
warnings.filterwarnings("ignore", message=".*__sklearn_tags__.*")

# Load the trained XGBoost model
xgb_model = XGBRegressor()
try:
    print("Loading model from: ./gb_model.json")
    xgb_model.load_model('./gb_model.json')  # Ensure the correct model format
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model: {str(e)}")

# Define categorical columns
categorical_features = [
    'brand', 'model', 'fuel_type', 'engine', 'transmission',
    'ext_col', 'int_col', 'accident', 'clean_title'
]

# Expected features (ensure alignment with training)
expected_features = categorical_features + ['model_year', 'milage']

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "✅ Car Price Prediction API is live! Use /predict to get predictions."})

@app.route('/predict', methods=['POST'])
def predict():
    print("📩 Request received at /predict")

    try:
        if not request.is_json:
            return jsonify({'error': 'Request must be in JSON format'}), 400
        
        input_data = request.get_json()
        print("🔍 Received input:", input_data)

        input_df = pd.DataFrame([input_data])

        # Convert categorical features to category type
        for col in categorical_features:
            if col in input_df.columns:
                input_df[col] = input_df[col].astype('category')

        # Ensure all expected features exist
        for feature in expected_features:
            if feature not in input_df.columns:
                input_df[feature] = 0  # Assign default values for missing features
        
        # Ensure column order matches training
        input_df = input_df[expected_features]
        
        print("✅ Processed Input DataFrame:")
        print(input_df)

        # Make prediction
        prediction = xgb_model.predict(input_df)[0]
        prediction = float(prediction)

        return jsonify({'predicted_price': prediction})

    except Exception as e:
        print(f"❌ Error during prediction: {str(e)}")
        return jsonify({'error': str(e)}), 400

# Run Flask in development mode (not needed for production)
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8000))
    app.run(host='0.0.0.0', port=port, debug=True)
