from flask import Flask
import pymysql
import pymysql.cursors
import json
from flask_cors import CORS
from flask import request
# flask 객체 할당
app = Flask(__name__)
CORS(app)
@app.route('/')
def home():
    return 'Hello, World!'
@app.route('/home')
def sub():
    return 'hello, my home'
def db_connection():
    db = pymysql.connect(
        host="127.0.0.1",
        port=3306,
        user="root",
        passwd="1234",
        db="aitrading_db",
        charset="utf8",
    )
    cursor = db.cursor(pymysql.cursors.DictCursor)
    # 커서 가져오기
    # cursor  데이터베이스와 상호 작용하는 데 사용하는 개체
    # dict으로 결과를 반환하겠다
    sql = 'SELECT * FROM companylist LIMIT 100;'
    # SQL query 실행
    cursor.execute(sql)
    # SQL query 실행 결과를 가져온다.
    result = cursor.fetchall()
    db.close()
    # excute()와 fetch()를 이용해 데이터 핸들링이 가능하다.
    # excute() 를 이용해 SQL을 실행하고,
    # 결과는 fetchall()을 이용해서 받아온다.
    return result
@app.route('/company')
def company(a):
    data = db_connection()
    values = request.values['name']
    #message = values["message"]
    print(values)
    #print(message)
    print(a)


    return json.dumps(data, indent="\t", ensure_ascii=False, default=str)
company("안녕")   
if __name__ == '__main__':
    # 현재 작성된 파이썬 파일이 메인으로 실행되는 파일이면, app.run을 수행해라.
    app.run(debug=True)
    # app.run() 괄호안에 debug=True 라고 명시하면 해당 파일의 코드가 수정될때마다, flask가 변경된것을 인식하고 다시 시작한다.