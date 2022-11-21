from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import sys
# 절대경로 지정
# sys.path.append("D:/2022-CHOY/github_team/project_a_4/back/db")
# import db_2

# 상대경로 지정
import os
# print(sys.path)
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from db import db
from routes.get_code_query import getCodes


app = Flask(__name__)
CORS(app)


@app.route('/')
@app.route('/test')
# view 함수
def table():
    return 'test'

# db GET
@app.route('/table_rate_m_kospi', methods=['GET'])
# view 함수
def get_kospi():
    newArr3 = list()
    db_class3 = db.Database()
    for code in getCodes('KOSPI'):
        sql3 = f"""
        SELECT B.name AS'종목명', A.code, A.day AS'날짜', A.close AS'종가', A.close-A.close2 AS'등락가', (A.close-A.close2)/A.close2*100 AS'등락율'
        FROM (
            SELECT code, day, close,
            IFNULL(LAG(close,1)over(ORDER BY day desc),0) AS close2
            FROM kospi_{code}_m
            LIMIT 2
        ) 
        AS A,companylist B
        WHERE A.code=B.code
        ORDER BY B.name
        LIMIT 2
        """
        row3 = db_class3.executeAll(sql3)
        newArr3.append(row3)
    # print(newArr)
    return newArr3

@app.route('/table_rate_m_kosdaq', methods=['GET'])
# view 함수
def get_kosdaq():
    newArr_dak = list()
    db_class_dak = db.Database()
    for code in getCodes('kosdak'):
        sql_dak = f"""
        SELECT B.name, A.code, A.day AS'날짜', A.close AS'종가', A.close-A.close2 AS'등락가', (A.close-A.close2)/A.close2*100 AS'등락율'
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

app.run(debug=True)


# print(getList());
# @app.route('/user/<user_name>/<int:user_id>')
# def user(user_name, user_id):
#     return f'Welcome, {user_name}({user_id})'
# ------------------------------------------------
# 테이블에 공통키 심기용 함수(사용 끝났으므로 실행하지 말것)
# @app.route('/addColumn', methods=['GET'])
# def get():
#     newArr3 = []
#     db_class3 = db.Database()
#     for codes in getCodes('kosdak'):
#         sql3 = f"""
#             ALTER TABLE kosdak_{codes}_m 
#             ADD code
#             VARCHAR(15) DEFAULT "{codes}"
#             """
#         # print(sql2)
#         row3 = db_class3.executeAll(sql3)
#         newArr3.append(row3)
#     # print(newArr)
#     return newArr3