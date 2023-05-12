import logging
from typing import Tuple

import pandas as pd
import numpy as np
from sksurv.column import encode_categorical
from sksurv.column import standardize
from sksurv.util import Surv

from surv_data_pipeline.columns import COLUMNS


logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(message)s')
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)


class ScikitSurvivalDataLoader:
    df = None
    target = None

    ''' ideas
     - return alredy smaller dataset with df = df.sample(frac=1).reset_index(drop=True) (draws sample percentage of the dataset)
     - return another variable - validation set (or do that in code itself)
    '''

    categorical_values = ["PRE_TX_TXFUS", "AGE_GROUP", "GENDER", "ABO", "DON_TY",
                          "ON_DIALYSIS", "GENDER_DON", "ABO_DON", "ABO_MAT", "DIABETES_DON"]
    numerical_values = ["CREAT_TRR", "NPKID", "AGE", "BMI_CALC", "WGT_KG_CALC", "HGT_CM_CALC", "AGE_DON", "BMI_DON_CALC",
                        "WGT_KG_DON_CALC", "HGT_CM_DON_CALC", 'A1', 'A2', 'B1', 'B2', 'DR1', 'DR2', 'BW4', 'BW6', 'C1', 'C2', 'DR51',
                        'BW6', 'C1', 'C2', 'DR51', 'DR51_2', 'DR52', 'DR52_2', 'DR53', 'DR53_2', 'DQ1', 'DQ2']

    def __init__(self, patient_survival: bool = True) -> None:
        self.target = ["GTIME_KI", "GSTATUS_KI"]
        if patient_survival:
            self.target = ["PTIME", "PSTATUS"]

        self.numerical_values.insert(0,self.target[1])
        self.numerical_values.insert(0,self.target[0])

    def load(self, fill_na_with_median:bool = True) -> Tuple[pd.DataFrame, any]:
        self._load_pd_df()
        self._handle_nan(fill_na_with_median)

        return self._get_X_y()

    def _load_pd_df(self):
        logger.info("Loading data into pandas DataFrame...")
        self.df = pd.read_parquet(
            "/mnt/lustre/helios-home/stadnkyr/Kidney_transplants.parquet", engine='auto', columns=COLUMNS)
        self.df = self.df[self.df['PSTATUS'].notnull()]

        # shuffle df

        logger.info("Done!")

    def _handle_nan(self, fill_na_with_median:bool):
        '''
        evaluation set should not have values that were calculated
        '''
        if fill_na_with_median:
            logger.info("Handling nan values...")

            self.df['ON_DIALYSIS'].fillna('N', inplace=True)  # could be a bad idea
            self.df["DIABETES_DON"].fillna(
                'N', inplace=True)  # could be a bad idea
            self.df["PRE_TX_TXFUS"].fillna(
                'N', inplace=True)  # could be a bad idea

            self.df.dropna(
                subset=["GENDER_DON", "ABO_DON", "ABO_MAT"], inplace=True)

            self.df.loc[:, self.numerical_values] = self.df.loc[:,
                                                                self.numerical_values].astype(np.float)

            don_bc_columns = ['HGT_CM_DON_CALC', 'WGT_KG_DON_CALC', 'BMI_DON_CALC']
            rec_bc_columns = ['HGT_CM_CALC', 'WGT_KG_CALC', 'BMI_CALC']

            for bc_column in don_bc_columns:
                self._fill_na_median_for_bc_column(
                    column=bc_column, is_recipient=False)

            for bc_column in rec_bc_columns:
                self._fill_na_median_for_bc_column(column=bc_column)
        else:
            logger.info("Not handling nan values...")
        
        self.df.dropna(subset=["CREAT_TRR",'HGT_CM_DON_CALC', 'WGT_KG_DON_CALC', 
                               'BMI_DON_CALC', "AGE_DON", 'HGT_CM_CALC', 
                               'WGT_KG_CALC', 'BMI_CALC', self.target[0]], inplace=True)
        logger.info("Done!")

    def _get_X_y(self) -> Tuple[pd.DataFrame, any]:
        logger.info("Dividing data into X and y...")
        categorical_x = encode_categorical(self.df[self.categorical_values])
        numerical_x = standardize(self.df[self.numerical_values])

        X = pd.concat([numerical_x, categorical_x], axis=1)
        X.drop([self.target[0], self.target[1]], axis=1, inplace=True)

        survival_time = self.df[self.target[0]].astype(np.float64)
        event = self.df[self.target[1]].astype(float).astype(np.bool)

        y = Surv.from_arrays(event, survival_time, "Status", "Days")

        self.df = None

        logger.info("Done!")

        return X, y

    def _fill_na_median_for_bc_column(self, column: str, is_recipient: bool = True):
        '''
        bc = body composition
        '''

        gender_column = self._get_gender_column_for_patient(is_recipient)

        for gender in ['M', 'F']:
            self.df.loc[(self.df[gender_column] == gender) &
                        (self.df[column].isnull()) &
                        (self.df['AGE_GROUP'] == "A"), column] = self._get_median(gender, column)

    def _get_median(self, gender: str, column: str, is_recipient: bool = True):
        gender_column = self._get_gender_column_for_patient(is_recipient)

        # COULDDO: create gender dataclass
        return self.df[self.df[gender_column] == gender][column].astype(float).median()

    def _get_gender_column_for_patient(self, is_recipient: bool):
        return "GENDER" if is_recipient else "GENDER_DON"
    
    def _calculate_gfr(self, creatinine, age, gender, race):
        pass


if __name__ == "__main__":
    import os
    print(os.getcwd())

    loader = ScikitSurvivalDataLoader()

    X, y = loader.load()
    print(X.head())
