from tsfresh import extract_features
from tsfresh.utilities.dataframe_functions import impute
import pandas as pd
import numpy as np
import os
import random
import json


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
        "count_above_mean": None,
        "count_below_mean": None,
        "first_location_of_maximum": None,
        "first_location_of_minimum": None,
        "mean_change": None,
        "sum_values": None,
        "kurtosis": None,
        "skewness": None,
        "abs_energy": None
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


def main(data_path1, data_path2):
    answer = random.choice(["да", "нет"])
    response = {
        "is_weak": answer
    }

    return json.dumps(response, ensure_ascii=False)
