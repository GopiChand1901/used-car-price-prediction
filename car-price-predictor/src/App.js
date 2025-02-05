import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const CarPricePredictor = () => {
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
        clean_title: ""
    });
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await axios.post("https://your-api-url.com/predict", formData);
            setPrediction(response.data.predicted_price);
        } catch (error) {
            setError("Failed to get prediction. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Car Price Prediction</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
                <div className="row">
                    <div className="col-md-6">
                        <label>Brand</label>
                        <select className="form-control" name="brand" onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="BMW">BMW</option>
                            <option value="Audi">Audi</option>
                            <option value="Toyota">Toyota</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label>Model</label>
                        <input type="text" className="form-control" name="model" onChange={handleChange} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6">
                        <label>Model Year</label>
                        <input type="number" className="form-control" name="model_year" onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label>Milage</label>
                        <input type="number" className="form-control" name="milage" onChange={handleChange} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6">
                        <label>Fuel Type</label>
                        <select className="form-control" name="fuel_type" onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Gasoline">Gasoline</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label>Transmission</label>
                        <select className="form-control" name="transmission" onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Automatic">Automatic</option>
                            <option value="Manual">Manual</option>
                        </select>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6">
                        <label>Accident History</label>
                        <select className="form-control" name="accident" onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="None reported">None reported</option>
                            <option value="At least 1 accident reported">At least 1 accident reported</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label>Clean Title</label>
                        <select className="form-control" name="clean_title" onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-4 w-100">Predict Price</button>
            </form>
            {prediction !== null && (
                <div className="alert alert-success mt-4 text-center">Predicted Price: ${prediction.toFixed(2)}</div>
            )}
            {error && <div className="alert alert-danger mt-4 text-center">{error}</div>}
        </div>
    );
};

export default CarPricePredictor;
