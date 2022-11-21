import sys,os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from config import db
from flask import request
import pandas as pd

def get_graph():
    market = request.args.get('market')
    code = request.args.get('code')
    day = request.args.get('day')

    db_class = db.Database()
    sql  = f"SELECT day, open, high, low, close FROM {market}_{code}_d where day >= DATE_ADD('2022-01-28', INTERVAL -1 {day})"

    row = db_class.executeAll(sql)

    frame = pd.DataFrame(row)
    data = []

    for index, row1 in list(frame.iterrows()):
        data.append([row1['day'], row1['open'],row1['high'],row1['low'],row1['close']])
    
    return data
    
