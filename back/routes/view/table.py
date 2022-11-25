# app.py 연결용 라우터
import sys,os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from config import db
from routes.get_code_query import getCodes

# 코스피
def kospi_data():
  newArr3 = list()
  db_class3 = db.Database()
  for code in getCodes('KOSPI'):
      sql3 = f"""
      SELECT B.name AS'종목명', B.market,  A.code, A.day AS'날짜', A.close AS'종가', 
      A.close-A.close2 AS'등락가', (A.close-A.close2)/A.close2*100 AS'등락율'
      FROM (
          SELECT code, day, close,
          IFNULL(LAG(close,1)over(ORDER BY day desc),0) AS close2
          FROM kospi_{code}_m
          LIMIT 2
      ) 
      AS A,companylist B
      WHERE A.code=B.code
      ORDER BY B.name
      LIMIT 2;
      """
      row3 = db_class3.executeAll(sql3)
      newArr3.append(row3)
  # print(newArr)
  return newArr3

# 코스닥
def kosdaq_data():
    newArr_dak = list()
    db_class_dak = db.Database()
    for code in getCodes('kosdak'):
        sql_dak = f"""
        SELECT B.name AS'종목명', B.market, A.code, A.day AS'날짜', A.close AS'종가', 
        A.close-A.close2 AS'등락가', (A.close-A.close2)/A.close2*100 AS'등락율'
        FROM (
            SELECT code, day, close,
            IFNULL(LAG(close,1)over(ORDER BY day desc),0) AS close2
            FROM kosdak_{code}_m
            LIMIT 2
        ) 
        AS A,companylist B
        WHERE A.code=B.code
        ORDER BY B.name
        LIMIT 2
        """
        row_dak = db_class_dak.executeAll(sql_dak)
        newArr_dak.append(row_dak)
    # print(newArr)
    return newArr_dak
