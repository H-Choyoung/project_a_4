import sys,os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from config import db
from flask import request, jsonify
import pandas as pd
import numpy as np
import datetime
from dateutil.relativedelta import relativedelta


def get_graph():
    print(request)
    market = request.args.get('market')
    code = request.args.get('code')
    day = request.args.get('day')

    db_class = db.Database()
    sql  = f"SELECT day, open, high, low, close FROM {market}_{code}_d where day >= DATE_ADD('2022-01-28', INTERVAL -1 {day})"

    row = db_class.executeAll(sql)

    frame = pd.DataFrame(row)
    
    print(frame)
    if day == 'month':
        Day = frame.iloc[-1]
        Last_Day = frame.iloc[-2]
    elif day == 'year':
        Day = frame.iloc[-1]['day']
        last_month = Day - relativedelta(months=1)
        # test =  Day.timedelta(weeks=1)
        print(last_month)
        # now = datetime.datetime.Day
        # print(now.strftime('%Y-%m-%d')) 
        # datetime.timedelta(months=-1)
        # 2021-12-28 ~  2022-01-28 = 12-28 - 01-28
        # 2021-01-28  ~ 2022-01-28
        
        # print(arr)
        # test = dt.datetime.strptime("2017-01-02", "%Y-%m-%d")
        # print(test,"aa")
        # my_date = datetime.datetime(int(arr[0]) , int(arr[1]), int(arr[2])).timedelta(months=-1)
        # print(my_date)
        # print(my_date)
        # print(Day+datetime.timedelta(months=-1))
        # # month = frame['테스트'].between('2021-01-01', '2021-12-31')
        # print(Day)

    # return "a"
    #  일 등락률 = (오늘종가 – 어제종가) / 어제종가 * 100
    rate = (Day['close'] - Last_Day['close']) / Last_Day['close'] * 100
    prev_day_price = (Day['close'] - Last_Day['close'])
    today_price = (Day['close'])


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
    
