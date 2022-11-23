import sys,os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from config import db
from flask import request, jsonify
import pandas as pd
import numpy as np
import datetime
from dateutil.relativedelta import relativedelta
from prophet import Prophet



def get_graph():
    print(request)
    market = request.args.get('market')
    code = request.args.get('code')
    day = request.args.get('day')

    db_class = db.Database()
    sql  = f"SELECT day, open, high, low, close FROM {market}_{code}_d where day >= DATE_ADD('2022-01-28', INTERVAL -1 {day})"

    row = db_class.executeAll(sql)

 

    frame = pd.DataFrame(row)
    if day == 'month':
        Day = frame.iloc[-1]['day']
        current_month = Day - relativedelta(weeks=1)
        last_month = current_month - relativedelta(weeks=1)
    elif day == 'year':
        Day = frame.iloc[-1]['day']
        current_month = Day - relativedelta(months=1)
        last_month = current_month - relativedelta(months=1)

    Day = frame.iloc[-1]['day']
        
    current_M = frame[frame['day'].between(current_month, Day)]['close'].mean()
    last_M = frame[frame['day'].between(last_month, current_month)]['close'].mean()
      

  

    # rate = (Day['close'] - Last_Day['close']) / Last_Day['close'] * 100
    # prev_day_price = (Day['close'] - Last_Day['close'])
    # today_price = (Day['close'])

    rate = (current_M - last_M) / last_M * 100
    prev_day_price = (current_M - last_M)
    today_price = (current_M)



    rate = np.float64(rate).item()
    prev_day_price = np.int64(prev_day_price).item()
    today_price = np.int64(today_price).item()
    
    obj = {
        "rate":rate,
        "prev_day_price":prev_day_price,
        "today_price":today_price,
    }


    data = []
    for index, row1 in list(frame.iterrows()):
        data.append([row1['day'], row1['open'],row1['high'],row1['low'],row1['close']])
    
    obj['data'] = data
   

    return obj
    


def get_prediction():
    db_class = db.Database()
    sql  = "SELECT * FROM kospi_005930_d"

    row = db_class.executeAll(sql)

    print(row)


    df_tmp = pd.DataFrame({"ds": df_raw["Date"], "y": df_raw["Close*"]})
    
    df_target = df_tmp[:-1]
    df_target.head()


    return 'a'
    