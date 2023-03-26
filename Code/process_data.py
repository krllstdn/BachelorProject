import logging

import pandas as pd
from features import NEW_FEATURES
from sklearn.compose import ColumnTransformer
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)


class DataProcessor:
    def __init__(self) -> tuple:
        return self.get_train_test_data()

    def get_train_test_data(self, path: str = "/mnt/lustre/helios-home/stadnkyr/Data/kidpan.csv"):

        df = self.get_pandas_dataframe(path)
        X_train, X_test, y_train, y_test = train_test_split(
            df.drop("PTIME", axis=1), df["PTIME"], test_size=0.2, random_state=42)

        categorical_values, numerical_values = self.get_categorical_and_numerical_columns()
        preprocessor = self.get_column_transformer(
            categorical_values, numerical_values)

        X_train = preprocessor.transform(X_train)
        X_test = preprocessor.transform(X_test)
        logger.info(f'Data has been scaled and split to train/test set')
        return X_train, X_test, y_train, y_test

    def get_pandas_dataframe(self, path: str = "/mnt/lustre/helios-home/stadnkyr/Data/kidpan.csv"):
        logger.info(
            f'Starting to upload {path} to Pandas DataFrame... It might take a while.')
        # Total number of rows in kidpan is 1 108 885
        full_dataset = pd.read_csv(path)
        kidney_transplants = full_dataset[full_dataset['WL_ORG'] == "KI"]
        df = kidney_transplants.loc[:, NEW_FEATURES]
        df = df[df['PTIME'].notnull()]
        df = df.dropna()
        logger.info(f'Done!')
        return df

    def get_categorical_and_numerical_columns(df):
        categorical_values = [
            col for col in df.columns if df[col].dtype == 'object']
        numerical_values = [
            col for col in df.columns if df[col].dtype == 'float64']
        return categorical_values, numerical_values

    def get_column_transformer(self, categorical_values, numerical_values):
        categorical_transformer = Pipeline(steps=[
            ('onehot', OneHotEncoder(handle_unknown='ignore'))
        ])

        numeric_transformer = Pipeline(steps=[
            ('scaler', StandardScaler())
        ])

        return ColumnTransformer(
            transformers=[
                ('cat', categorical_transformer, categorical_values),
                ('num', numeric_transformer, numerical_values)
            ])
