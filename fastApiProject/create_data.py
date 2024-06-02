from tsfresh import extract_features
from tsfresh.utilities.dataframe_functions import impute
import pandas as pd
import numpy as np
import os
from tqdm import tqdm


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
        "mean_change": None, #Среднее изменение между последовательными точками данных во временном ряде.
        "sum_values": None,
        "kurtosis": None, #Мера формы распределения данных, отражающая остроту и высоту пика.
        "skewness": None, #Мера асимметрии распределения данных относительно их среднего значения.
        "abs_energy": None, #Сумма квадратов значений временного ряда, используемая как мера амплитуды ряда.

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


out_data1 = pd.DataFrame()
out_data2 = pd.DataFrame()
data_directory = "data/"

class_folders_sts = os.listdir(data_directory)
class_folders_sts = sorted(class_folders_sts)
data_ascii = ["O1-M2/N-1.ascii", "O2-M1/N-1.ascii"]
data_ascii2 = ["O1-M2/N-2.ascii", "O2-M1/N-2.ascii"]

for i, path_ in (enumerate(class_folders_sts)):

    path1 = "data/" + path_ + "/Nr 1/"
    path2 = "data/" + path_ + "/Nr 2/"

    for elem in data_ascii:
        path1_1 = path1 + elem
        df = pd.read_csv(path1_1)
        df.columns = ['value']
        df['id'] = path_.split()[1]

        feat = featuresTSFresh(df)
        feat['Nr'] = '1'
        ch = elem.split('/')[0]
        feat['Channel'] = ch
        # feat.columns = [f"{c}_o2m1" for c in feat.columns]
        if ch == 'O1-M2':
            out_data1 = pd.concat([out_data1, feat], axis=0)
        else:
            out_data2 = pd.concat([out_data2, feat], axis=0)

    for elem in data_ascii2:
        path1_2 = path2 + elem
        df = pd.read_csv(path1_2)
        df.columns = ['value']
        df['id'] = path_.split()[1]

        feat = featuresTSFresh(df)
        feat['Nr'] = '2'
        ch = elem.split('/')[0]
        feat['Channel'] = ch
        # 
        if ch == 'O1-M2':
            out_data1 = pd.concat([out_data1, feat], axis=0)
        else:
            out_data2 = pd.concat([out_data2, feat], axis=0)

out_data1.to_csv("out_data1_del.csv", index=False)
out_data2.to_csv("out_data2_del.csv", index=False)
print("done")
