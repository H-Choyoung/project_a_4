from flask import Flask, render_template
import pymysql

conn = pymysql.connect (
  host='127.0.0.1',
  port=3307,
  user='root',
  password='kdt305',
  db='aitrading_db',
  charset='utf8'
)

cur = conn.cursor()
sql = 'SELECT * FROM companylist'
cur.execute(sql)
results = cur.fetchall()
# print(results)

app = Flask(__name__)

def main():
  sql ='SELECT * FROM companylist'
  cur.execute(sql)
  results = cur.fetchmany(10)
  # print(list(results[0]))
  # print(list(results[0])[3])
  return results

@app.route('/')
def index():
  return "hello"
if __name__ == '__main__':
  app.run(port =8080, debug=True)