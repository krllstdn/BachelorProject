import logging
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import ElasticNet, Lasso, LinearRegression, LogisticRegression, Ridge, SGDRegressor
from sklearn.svm import SVR, LinearSVR
from sklearn.tree import DecisionTreeRegressor
from sklearn.model_selection import cross_val_score

from sklearn.metrics import mean_squared_error
import numpy as np

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)

class Regressors:
    """
    On init trains all main regressors with provided data
    """
    def __init__(self, X_train, y_train, X_test, y_test, cross_validation: bool = False) -> None:
        """
        On init trains all main regressors with provided data
        """
        self.RandomForestRegressor(X_train, y_train, X_test, y_test, cross_validation)
        self.LassoRegressor(X_train, y_train, X_test, y_test, cross_validation)
        self.RidgeRegressor(X_train, y_train, X_test, y_test, cross_validation)
        self.LinearRegression(X_train, y_train, X_test, y_test, cross_validation)
        self.ElasticNetRegressor(X_train, y_train, X_test, y_test, cross_validation)
        self.SGDRegressor(X_train, y_train, X_test, y_test, cross_validation)
        self.DecisionTreeRegressor(X_train, y_train, X_test, y_test, cross_validation)

        # Don't work properly
        # self.LinearSVRRegressor(X_train, y_train, X_test, y_test, cross_validation)
        # self.SVRRegressor(X_train, y_train, X_test, y_test, cross_validation)
        # self.LogisticRegression(X_train, y_train, X_test, y_test, cross_validation)
        
    def evaluate_error(actual_labels, calculated_labels):
        mse = mean_squared_error(actual_labels, calculated_labels)
        rmse = np.sqrt(mse)
        print("Mean Square Error: ", mse)
        print("Root Mean Square Error: ", rmse)

    def cross_validation(self, regressor, X_train, y_train):
        def display_scores(scores):
            print("Scores:", scores)
            print("Mean:", scores.mean())
            print("Standard deviation:", scores.std())

        scores = cross_val_score(regressor, X_train, y_train, scoring="neg_mean_squared_error", cv=10)
        rmse_scores = np.sqrt(-scores)
        display_scores(rmse_scores)
        

    def LinearRegression(self, X_train, y_train, X_test, y_test, cross_validation: bool = False):
        logger.info(f'Training LinearRegression....')
        lin_reg = LinearRegression()
        lin_reg.fit(X_train, y_train)

        survival_predictions = lin_reg.predict(X_test)
        self.evaluate_error(y_test, survival_predictions)

        if cross_validation:
            self.cross_validation(lin_reg, X_train,y_train)
    
    def DecisionTreeRegressor(self, X_train, y_train, X_test, y_test, cross_validation: bool = False):
        logger.info(f'Training DecisionTreeRegressor....')
        tree_train_reg = DecisionTreeRegressor()
        tree_train_reg.fit(X_train, y_train)
        
        survival_predictions = tree_train_reg.predict(X_test)
        self.evaluate_error(y_test, survival_predictions)

        if cross_validation:
            self.cross_validation(tree_train_reg, X_train,y_train)

    def RandomForestRegressor(self, X_train, y_train, X_test, y_test, cross_validation: bool = False):
        logger.info(f'Training RandomForestRegressor....')
        forest_reg = RandomForestRegressor(max_features=8,n_estimators=140)
        forest_reg.fit(X_train, y_train)
        
        survival_predictions = forest_reg.predict(X_test)
        self.evaluate_errors(y_test, survival_predictions)

        if cross_validation:
            self.cross_validation(forest_reg, X_train,y_train)

    def LassoRegressor(self, X_train, y_train, X_test, y_test, cross_validation: bool = False):
        logger.info(f'Training LassoRegressor....')
        
        lasso_regressor = Lasso(alpha=0.1)
        lasso_regressor.fit(X_train, y_train)
        
        survival_predictions = lasso_regressor.predict(X_test)
        self.evaluate_errors(y_test, survival_predictions)

        if cross_validation:
            self.cross_validation(lasso_regressor, X_train,y_train)

    def RidgeRegressor(self, X_train, y_train, X_test, y_test, cross_validation: bool = False):
        logger.info(f'Training RidgeRegressor....')
        
        ridge_regressor = Ridge(alpha=0.05)
        ridge_regressor.fit(X_train, y_train)

        survival_predictions = ridge_regressor.predict(X_test)

        self.evaluate_errors(y_test, survival_predictions)

        if cross_validation:
            self.cross_validation(ridge_regressor, X_train,y_train)

    def ElasticNetRegressor(self, X_train, y_train, X_test, y_test, cross_validation: bool = False):
        logger.info(f'Training ElasticNetRegressor....')
        
        elastic_regressor = ElasticNet(alpha=0.1)
        elastic_regressor.fit(X_train, y_train)

        survival_predictions = elastic_regressor.predict(X_test)

        self.evaluate_errors(y_test, survival_predictions)

        if cross_validation:
            self.cross_validation(elastic_regressor, X_train,y_train)

    def SGDRegressor(self, X_train, y_train, X_test, y_test, cross_validation: bool = False):
        logger.info(f'Training SGDRegressor....')
        
        sgdr_regressor = SGDRegressor(verbose=True)
        sgdr_regressor.fit(X_train, y_train)

        predict = sgdr_regressor.predict(X_test)

        self.evaluate_errors(y_test, predict)

        if cross_validation:
            self.cross_validation(sgdr_regressor, X_train,y_train)

    def SVRRegressor(self, X_train, y_train, X_test, y_test, cross_validation: bool = False):
        """
        Runs forever even with the small dataset. Try experimenting with parameters. But the model is useless.
        """
        logger.info(f'Training SVRRegressor.... Might be impossible to train.')

        svr_regressor = SVR(kernel='rbf', gamma='auto')
        svr_regressor.fit(X_train, y_train)

        predict = svr_regressor.predict(X_test)

        self.evaluate_errors(y_test, predict)

        if cross_validation:
            self.cross_validation(svr_regressor, X_train,y_train)

    def LinearSVRRegressor(self, X_train, y_train, X_test, y_test, cross_validation: bool = False):
        """
        Runs forever even with the small dataset. Try experimenting with parameters. But the model is useless.
        """
        logger.info(f'Training LinearSVRRegressor.... Might be impossible to train.')

        linear_svr_regressor = LinearSVR()
        linear_svr_regressor.fit(X_train, y_train)

        predict = linear_svr_regressor.predict(X_test)

        self.evaluate_errors(y_test, predict)

        if cross_validation:
            self.cross_validation(linear_svr_regressor, X_train,y_train)


    def LogisticRegression(self, X_train, y_train, X_test, y_test, cross_validation: bool = False):
        """
        Breaks jupyter notebook kernel :/ 
        Maybe will work fine with python script
        """
        logger.info(f'Training LogisticRegression.... Might be impossible to train.')

        logistic_regressor = LogisticRegression()
        logistic_regressor.fit(X_train, y_train)

        predict = logistic_regressor.predict(X_test)

        self.evaluate_errors(y_test, predict)

        if cross_validation:
            self.cross_validation(logistic_regressor, X_train,y_train)
