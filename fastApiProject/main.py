from fastapi import FastAPI, UploadFile, Form, File
from fastapi.middleware.cors import CORSMiddleware
from tsfresh import extract_features
from tsfresh.utilities.dataframe_functions import impute
from catboost import CatBoostClassifier
from sklearn.ensemble import RandomForestClassifier
import pandas as pd
import numpy as np
import os
import random
import json
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


def featuresTSFresh(data):
    ## список фич (см. документацию по TSFresh: https://media.readthedocs.org/pdf/tsfresh/latest/tsfresh.pdf)
    extraction_settings = {
        ## признак: параметр
        "maximum": None,
        "mean": None,
        "minimum": None,
        "median": None,
        "standard_deviation": None,
        "binned_entropy": [{"max_bins": 10}],
        # Мера разнообразия значений временного ряда, вычисленная путем разделения значений на заданное количество интервалов (бинов) и вычисления энтропии.
        "count_above_mean": None,
        "count_below_mean": None,
        "first_location_of_maximum": None,
        "first_location_of_minimum": None,
        "mean_change": None,  # Среднее изменение между последовательными точками данных во временном ряде.
        "sum_values": None,
        "kurtosis": None,  # Мера формы распределения данных, отражающая остроту и высоту пика.
        "skewness": None,  # Мера асимметрии распределения данных относительно их среднего значения.
        "abs_energy": None,  # Сумма квадратов значений временного ряда, используемая как мера амплитуды ряда.

        "autocorrelation": [{"lag": 1}],
        "quantile": [{"q": 0.25}, {"q": 0.75}],  # Квантили
        "longest_strike_below_mean": None,  # Длина самого длинного сегмента, значение которого меньше среднего
        "longest_strike_above_mean": None,  # Длина самого длинного сегмента, значение которого больше среднего

        "percentage_of_reoccurring_values_to_all_values": None,  # Процент повторяющихся значений ко всем значениям
        "percentage_of_reoccurring_datapoints_to_all_datapoints": None,
        # Процент повторяющихся точек данных ко всем точкам данных
        "sum_of_reoccurring_values": None,  # Сумма повторяющихся значений
        "sum_of_reoccurring_data_points": None,
        # "fft_aggregated": [{"aggtype": "centroid"}, {"aggtype": "variance"}],  # Среднее и дисперсия спектра
        # # Частотные характеристики
        # "augmented_dickey_fuller": [{"attr": "teststat"}, {"attr": "pvalue"}, {"attr": "usedlag"}],  # Тест Дики-Фуллера
        # Геометрические характеристики
        "number_peaks": [{"n": 5}],  # Количество пиков в спектре
        # Другие признаки
        # "number_cwt_peaks": [{"n": 1}]
    }

    ## извлечение фич из данных
    featuresDF = extract_features(
        data,
        column_id='id',  ## номер временного ряда
        # column_sort='t', ## ось времени
        default_fc_parameters=extraction_settings,  ## список фич, которые хотим извлечь
        impute_function=impute  ## заменить все inf и NaN
    )

    ## вытаскиваем колонку id из индекса
    featuresDF = featuresDF.reset_index()

    return featuresDF


def main(data1, data2):
    data1.columns = ['value']
    data1['id'] = 1
    hour_time = len(data1) / (200*60*60)
    feat1 = featuresTSFresh(data1)
    feat1 = feat1.drop("index", axis=1).rename(columns={c: f"o1m2_{c}" for c in feat1.columns})

    data2.columns = ['value']
    data2['id'] = 1
    feat2 = featuresTSFresh(data2)
    feat2 = feat2.drop("index", axis=1).rename(columns={c: f"o2m1_{c}" for c in feat2.columns})

    data = pd.concat([feat2, feat1], axis=1)

    model = pd.read_pickle("model.pkl")

    proba = model.predict_proba(data)[:, 1]
    eps = np.random.uniform(0.01, 0.1)
    proba = proba.clip(0.01, 0.8 + eps)

    ai_pred, ahi_pred, hi_pred = 0, 0, 0

    if proba >= 0.5:
        answer = "да"
        ai_model = pd.read_pickle("ai_reg.pkl")
        ai_pred = ai_model.predict(data).tolist()

        ahi_model = pd.read_pickle("ahi_reg.pkl")
        ahi_pred = ahi_model.predict(data).tolist()

        ahi_model = pd.read_pickle("hi_reg.pkl")
        hi_pred = ahi_model.predict(data).tolist()

    else:
        answer = "нет"

    response = {
        "is_weak": answer,
        "score": proba.tolist(),
        "ai": ai_pred,  # индекс апноэ
        "ahi": ahi_pred,  # индекс апноэ-гипопноэ
        "hi": hi_pred,  # индекс гипопноэ
        "hour_time": hour_time
    }

    return response


@app.post("/getData")
async def get_data(file1: UploadFile = File(...), file2: UploadFile = File(...)):
    content1 = pd.read_csv(file1.file)
    content2 = pd.read_csv(file2.file)
    result = main(content1, content2)

    return result
