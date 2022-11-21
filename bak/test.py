import pymysql
from get_code_query import getCodes
import numpy as np
import pandas as pd
pd.set_option('display.max_rows', 50)
pd.set_option('display.max_columns', None)

def test(): 
    # *DB connect
    conn = pymysql.connect(host='127.0.0.1', user='root',
                           password='fullstack305', port=3306, db='aitrading_db', charset='utf8')
    try:
        lists = list()
        for code in getCodes('KOSPI'):
            qr = f"""
            SELECT code
            FROM kosdak_000250_m
            """
            curs = conn.cursor(pymysql.cursors.DictCursor)
            curs.execute(qr)
            rows = curs.fetchall()
            lists.append(rows)
        print(lists)
        return lists
    
    finally:
        conn.close()

test()

