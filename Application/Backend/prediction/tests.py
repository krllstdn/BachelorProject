from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse


# Create your tests here.
class TestPrediction(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse("predict")

    def test_coxnet_deceased(self):
        data = {
            "model_name": "COXNET_DECEASED",
            "features": {
                "ON_DIALYSIS": "Y",
                "PRE_TX_TXFUS": "Y",
                "GENDER": "M",
                "ETHCAT": "1",
                "DIABETES_DON": "N",
                "DIAB": "1",
                "HCV_SEROSTATUS": "N",
                "AGE": "39",
                "BMI_CALC": "20",
                "AGE_DON": "50",
                "CREAT_TRR": "200",
                "CREAT_DON": "80",
                "NPKID": "0",
                "RDR2": "0",
                "DR53": "0",
                "DR2": "0",
                "COLD_ISCH_KI": "0",
            },
        }

        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 200)

    def test_coxnet_living(self):
        data = {
            "model_name": "COXNET_LIVING",
            "features": {
                "PRE_TX_TXFUS": "N",
                "GENDER": "M",
                "ON_DIALYSIS": "Y",
                "ABO_MAT": "1",
                "ETHCAT": "2",
                "ETHCAT_DON": "2",
                "HBV_CORE": "N",
                "DIAB": "5",
                "HBV_SUR_ANTIGEN": "N",
                "HCV_SEROSTATUS": "N",
                "LIV_DON_TY": "4",
                "SERUM_CREAT": "5.2",
                "AGE": "50",
                "BMI_CALC": 0,
                "AGE_DON": "46",
                "CREAT_TRR": 0,
                "NPKID": "0",
                "RDR2": 0,
                "DR53": "0",
                "DR2": 0,
                "COLD_ISCH_KI": 0,
                "CREAT_DON": 0,
                "KI_CREAT_PREOP": "8",
                "BMIS": "1",
                "HGT_CM_CALC": "180",
                "BMI_DON_CALC": "30",
                "DR1": "0",
                "BW6": "0",
                "BW4": "0",
                "RA1": "30",
                "A2": "11",
                "C1": "0",
                "C2": "0",
                "A1": "10",
                "RA2": "0",
                "DR51": "0",
                "DR52": "0",
                "DQ2": "0",
                "RDR1": "11",
            },
        }

        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 200)


class TestRandomDataGeneration(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse("synthetic")

    def test_random_coxnet_deceased(self):
        data = {"model_name": "COXNET_DECEASED"}

        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data)
        self.assertEqual(len(response.data), 17)

    def test_random_coxnet_living(self):
        data = {"model_name": "COXNET_LIVING"}

        response = self.client.post(self.url, data, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data)
        self.assertEqual(len(response.data), 33)
