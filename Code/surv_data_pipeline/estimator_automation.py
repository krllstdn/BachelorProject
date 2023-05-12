from sksurv.ensemble import GradientBoostingSurvivalAnalysis
from sksurv.ensemble import ComponentwiseGradientBoostingSurvivalAnalysis
from sksurv.ensemble import RandomSurvivalForest
from sksurv.linear_model import CoxPHSurvivalAnalysis, CoxnetSurvivalAnalysis


import numpy as np
from sklearn.model_selection import train_test_split
import logging
import time

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(message)s')
console_handler.setFormatter(formatter)
logger.addHandler(console_handler)


from sksurv.metrics import (
    concordance_index_censored,
    concordance_index_ipcw,
    cumulative_dynamic_auc,
    integrated_brier_score,
)

class SurvivalEstimators:
    def __init__(self, X, y, n_instances:int = 20000, ) -> None:
        mini_x, mini_y = X[:n_instances], y[:n_instances]

        self.mini_X_train, self.mini_X_test, self.mini_y_train, self.mini_y_test = train_test_split(
            mini_x, mini_y, stratify=mini_y["Status"], random_state=1, test_size=0.1
        )

        lower, upper = np.percentile(mini_y["Days"], [10, 90])
        self.times = np.arange(lower, upper + 1)

    def train(self):
        self.gradient_boosting()
        self.random_survival_forest()
        self.cox_net()
        self.cox_ph()

    def gradient_boosting(self):
        est_cph_tree = GradientBoostingSurvivalAnalysis(
            n_estimators=18, learning_rate=1, max_depth=2, random_state=0
        )

        logger.info("Training Gradient Boosting...")
        start_time = time.time()

        est_cph_tree.fit(self.mini_X_train, self.mini_y_train)

        end_time = time.time()
        self._log_estimator_training_time("GB", start_time, end_time)   

        score = est_cph_tree.score(self.mini_X_test, self.mini_y_test)
        uno_score = SurvivalEstimatorEvaluation.evaluate_model_uno_c(est_cph_tree, self.mini_X_test, self.mini_y_test, self.mini_y_train, self.times)

        self._log_estimator_evaluation("GB", score, uno_score)

    def random_survival_forest(self):
        rsf = RandomSurvivalForest(n_estimators=150,
                           min_samples_split=2,
                           min_samples_leaf=4,
                           max_depth=2,
                           n_jobs=-1,
                           random_state=23)
        
        logger.info("Training Random Survival Forest...")
        start_time = time.time()

        rsf.fit(self.mini_X_train, self.mini_y_train)

        end_time = time.time()
        self._log_estimator_training_time("RSF", start_time, end_time) 

        score = rsf.score(self.mini_X_test, self.mini_y_test)
        uno_score = SurvivalEstimatorEvaluation.evaluate_model_uno_c(rsf, self.mini_X_test, self.mini_y_test, self.mini_y_train, self.times)

        self._log_estimator_evaluation("RSF", score, uno_score)

    def cox_net(self):
        cox_net = CoxnetSurvivalAnalysis()

        logger.info("Training Coxnet...")
        start_time = time.time()

        cox_net.fit(self.mini_X_train, self.mini_y_train)

        end_time = time.time()
        self._log_estimator_training_time("Coxnet", start_time, end_time)

        score = cox_net.score(self.mini_X_test, self.mini_y_test)
        uno_score = SurvivalEstimatorEvaluation.evaluate_model_uno_c(cox_net, self.mini_X_test, self.mini_y_test, self.mini_y_train, self.times)

        self._log_estimator_evaluation("Coxnet", score, uno_score)

    def cox_ph(self):
        cph = CoxPHSurvivalAnalysis(alpha=0.8)
        
        logger.info("Training CoxPH...")
        start_time = time.time()

        cph.fit(self.mini_X_train, self.mini_y_train)

        end_time = time.time()
        self._log_estimator_training_time("CoxPH", start_time, end_time)

        score = cph.score(self.mini_X_test, self.mini_y_test)
        uno_score = SurvivalEstimatorEvaluation.evaluate_model_uno_c(cph, self.mini_X_test, self.mini_y_test, self.mini_y_train, self.times)

        self._log_estimator_evaluation("CoxPH", score, uno_score)


    def _log_estimator_evaluation(self, estimator_name, score, uno_score):
        logger.info(f"{estimator_name}'s score: {score}")
        logger.info(f"Uno's c-index score: {str(uno_score[0])}")
        logger.info("----------------------")

    def _log_estimator_training_time(self, estimator_name, start_time, end_time):
        training_time = end_time-start_time
        logger.info("{} took: {:.5f} seconds to train".format(estimator_name, training_time))


class SurvivalEstimatorEvaluation:

    def evaluate_model_uno_c(model, test_X, test_y, train_y, times):
        pred = model.predict(test_X)
        uno_concordance = concordance_index_ipcw(train_y, test_y, pred, tau=times[-1])
        # print(unos_concordance)
        return uno_concordance

    def evaluate_model_auc(model, test_X, test_y, train_y, times):
        pred = model.predict(test_X)
        dynamic_auc = cumulative_dynamic_auc(train_y, test_y, pred, tau=times[-1])
        print(dynamic_auc)

    def evaluate_model_brier(model, test_X, test_y, train_y, times):
        pred = model.predict(test_X)
        brier_score = integrated_brier_score(train_y, test_y, pred, tau=times[-1])
        print(brier_score)
    