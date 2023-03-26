from regressor_models import Regressors
from process_data import DataProcessor


if __name__ == "__main__":
    X_train, X_test, y_train, y_test = DataProcessor()

    Regressors(X_train, X_test, y_train, y_test)

