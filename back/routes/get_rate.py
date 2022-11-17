import pymysql
from get_code_query import getCodes
import numpy as np
import pandas as pd
pd.set_option('display.max_rows', 50)
pd.set_option('display.max_columns', None)

def getRates(): 
    # *DB connect
    conn = pymysql.connect(host='127.0.0.1', user='root',
                           password='fullstack305', port=3306, db='aitrading_db', charset='utf8')
    try:
        lists = list()
        for code in getCodes('KOSPI'):
            qr = f"""
            SELECT A.code, A.day AS'날짜', A.close AS'종가', A.close-A.close2 AS'등락가', (A.close-A.close2)/A.close2*100 AS'등락율'
            FROM (
                SELECT day, close,
                IFNULL(LAG(close,1)over(ORDER BY day desc),0) AS close2
                FROM kospi_{code}_m
            ) 
            AS A,companylist B
            WHERE A.code=B.code
            ORDER BY A.day;
            """
            curs = conn.cursor(pymysql.cursors.DictCursor)
            curs.execute(qr)
            rows = curs.fetchall()
            lists.append(rows)
        print(lists)
        return lists
    
    finally:
        conn.close()

getRates()

def pdTable():
#    pdTest = pd.Series(getRates(),index=getCodes('kospi'))
   pdTest = pd.Series(getRates())
   return pdTest
# print(pdTable())
