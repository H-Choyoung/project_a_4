import requests
from config import db



#db연결
# conn = pymysql.connect (
#   host='127.0.0.1',
#   port=3307,
#   user='root',
#   password='1234',
#   db='aitrading_db',
#   charset='utf8'
# )

# cur = conn.cursor(pymysql.cursors.DictCursor)
# sql = 'SELECT name FROM companylist'
# cur.execute(sql)
# results = list(cur.fetchall())
# print(results)



client_id = "_85wvqThYJUdir8dWo5o"
client_secret = "gmaG1XD16B"
serch_word = ""
encode_tpye = 'json' 
max_display = 30
sort = 'sim' #sim 관련도 date 시간순
start = 1

urlSim = f"https://openapi.naver.com/v1/search/news.{encode_tpye}?query=주가상승하락&display={str(int(max_display))}&start={str(int(start))}&sort=sim"

urlDate = f"https://openapi.naver.com/v1/search/news.{encode_tpye}?query=주가상승하락&display={str(int(max_display))}&start={str(int(start))}&sort=date"

headers = {
  "X-Naver-Client-Id" : client_id,
  "X-Naver-Client-Secret" : client_secret
}


def main():
  db_class = db.Database()
  sql ='SELECT name, code, market FROM companylist'
  row = db_class.executeAll(sql)
  return row


# @app.route('/')
def home():
  r1 = requests.get(urlSim, headers=headers).json()
  r2 = requests.get(urlDate, headers=headers).json()
  companyObj = main()

  obj = {
    "sim" : r1,
    "date" : r2,
    "name" : companyObj
  }
  # print(companyObj)
  return obj

# @app.route('/<companyname>')
def serch_get(companyname):
  # print(companyname)
  serch_word = companyname
  # print(serch_word)

  url3 = f"https://openapi.naver.com/v1/search/news.{encode_tpye}?query={serch_word}&display={str(int(max_display))}&start={str(int(start))}&sort=sim"
  url4 = f"https://openapi.naver.com/v1/search/news.{encode_tpye}?query={serch_word}&display={str(int(max_display))}&start={str(int(start))}&sort=date"

  r3 = requests.get(url3, headers=headers).json()
  r4 = requests.get(url4, headers=headers).json()
  obj = {
    "sim" : r3,
    "date" : r4
  }
  # print(obj)
  return obj

