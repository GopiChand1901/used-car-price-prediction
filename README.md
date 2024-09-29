
# Used Car Price Prediction

This project is part of a Kaggle competition aimed at predicting the price of used cars using various features such as year, model, mileage, etc. The dataset was generated using a deep learning model based on the original **Used Car Price Prediction Dataset**, with slight variations in feature distributions.

The objective is to develop a regression model that accurately predicts the car prices in the test dataset. I explored various machine learning algorithms, such as **AdaBoost**, **Gradient Boosting**, and **XGBoost**, to improve model performance.
## Dataset

- **train.csv**: The training dataset, which includes features like mileage, year, make, model, etc., and the target variable `price`.
- **test.csv**: The test dataset without the target variable. The goal is to predict `price` for each row.
- **sample_submission.csv**: A sample submission file showing the expected format of the predictions.

You can download the dataset from the [Kaggle Competition Page](https://www.kaggle.com/competitions/playground-series-s4e9/data)

## Modeling Approach

I explored the following machine learning models for price prediction:

1. **AdaBoost**: An ensemble technique that combines multiple weak learners to create a strong predictive model.
2. **Gradient Boosting**: Another ensemble method that builds models sequentially, reducing errors from previous iterations.
3. **XGBoost**: A highly efficient and scalable version of gradient boosting, with regularization and advanced tree-pruning techniques.

Each model was evaluated based on metrics such as Mean Absolute Error (MAE) and Root Mean Squared Error (RMSE). I performed hyperparameter tuning using cross-validation to improve the model’s performance.
## Results

- The final model chosen was **XGBoost**, which performed the best with an RMSE score of X on the test set.
- Additional preprocessing steps, such as encoding categorical variables and scaling numerical features, improved model performance.
- The incorporation of the original dataset alongside the competition data showed some improvements in model accuracy.

The final submission file is available as `submission_ada_boost.csv`.
