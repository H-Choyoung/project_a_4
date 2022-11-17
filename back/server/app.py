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
# from routes.table_query import getList
from routes.get_code_query import getCodes
# from routes.codes import codeList
from routes.get_api import getApi


app = Flask(__name__)
CORS(app)


@app.route('/')
@app.route('/test')
# view 함수
def table():
    return 'test'

# db GET
@app.route('/table_220203_m', methods=['GET'])
# view 함수
def table_get():
    # return getList()
    newArr = []
    db_class = db.Database()
    for codes in getCodes('KOSPI'):
        sql = """
        SELECT T1.code, T1.name, T2.close, T2.day
        FROM companylist T1
        INNER JOIN kospi_""" + str(codes) + """_m T2
        WHERE T1.code='""" + str(codes) + """'
        AND T2.day ='2022-02-03'
        """
        # print(sql2)
        row = db_class.executeAll(sql)
        newArr.append(row)
    # print(newArr)
    return jsonify(newArr)

@app.route('/table_220103_m', methods=['GET'])
# view 함수
def table_get2():
    newArr2 = []
    db_class2 = db.Database()
    for codes in getCodes('KOSPI'):
        sql2 = """
        SELECT T1.code, T1.name, T2.close, T2.day
        FROM companylist T1
        INNER JOIN kospi_""" + str(codes) + """_m T2
        WHERE T1.code='""" + str(codes) + """'
        AND T2.day ='2022-01-03'
        """
        # print(sql2)
        row2 = db_class2.executeAll(sql2)
        newArr2.append(row2)
    # print(newArr)
    return newArr2




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