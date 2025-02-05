import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    model_year: "",
    milage: "",
    fuel_type: "",
    engine: "",
    transmission: "",
    ext_col: "",
    int_col: "",
    accident: "",
    clean_title: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const response = await axios.post(
        "https://your-api-url.onrender.com/predict",
        formData
      );
      setPrediction(response.data.predicted_price);
    } catch (err) {
      setError("Failed to get prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Car Price Prediction</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="row">
          <div className="col-md-6">
            <label>Brand:</label>
            <select name="brand" className="form-control" onChange={handleChange}>
              <option value="">Select Brand</option>
              <option value="BMW">BMW</option>
              <option value="Audi">Audi</option>
              <option value="Toyota">Toyota</option>
            </select>

            <label>Model:</label>
            <select name="model" className="form-control" onChange={handleChange}>
              <option value="">Select Model</option>
              <option value="M4 Base">M4 Base</option>
              <option value="A4">A4</option>
              <option value="Corolla">Corolla</option>
            </select>

            <label>Model Year:</label>
            <input type="number" name="model_year" className="form-control" onChange={handleChange} />

            <label>Mileage:</label>
            <input type="number" name="milage" className="form-control" onChange={handleChange} />

            <label>Fuel Type:</label>
            <select name="fuel_type" className="form-control" onChange={handleChange}>
              <option value="">Select Fuel Type</option>
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
            </select>

            <label>Engine:</label>
            <select name="engine" className="form-control" onChange={handleChange}>
              <option value="">Select Engine</option>
              <option value="425.0HP 3.0L">425.0HP 3.0L</option>
              <option value="200.0HP 2.0L">200.0HP 2.0L</option>
            </select>
          </div>

          <div className="col-md-6">
            <label>Transmission:</label>
            <select name="transmission" className="form-control" onChange={handleChange}>
              <option value="">Select Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>

            <label>Exterior Color:</label>
            <select name="ext_col" className="form-control" onChange={handleChange}>
              <option value="">Select Exterior Color</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Blue">Blue</option>
            </select>

            <label>Interior Color:</label>
            <select name="int_col" className="form-control" onChange={handleChange}>
              <option value="">Select Interior Color</option>
              <option value="Black">Black</option>
              <option value="Beige">Beige</option>
              <option value="Red">Red</option>
            </select>

            <label>Accident History:</label>
            <select name="accident" className="form-control" onChange={handleChange}>
              <option value="">Select Accident History</option>
              <option value="None reported">None reported</option>
              <option value="At least 1 accident reported">At least 1 accident reported</option>
            </select>

            <label>Clean Title:</label>
            <select name="clean_title" className="form-control" onChange={handleChange}>
              <option value="">Select Clean Title</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
          {loading ? "Predicting..." : "Get Prediction"}
        </button>
      </form>

      {prediction && (
        <div className="alert alert-success mt-3">
          <h4>Predicted Price: ${prediction.toFixed(2)}</h4>
        </div>
      )}

      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default App;
