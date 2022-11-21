# app.py 연결용 라우터
import sys,os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from config import db

def example(code):
  newList = list()
  db_class = db.Database() #클래스 이용해 데이터베이스 연결 생성
  sql = f"""
  SELECT {code}, name
  FROM companylist
  LIMIT 10
  """
  row = db_class.executeAll(sql)
  newList.append(row)
  # print(newList)
  return newList

# example('code')