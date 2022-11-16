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
    for codes in getCodes():
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
    for codes in getCodes():
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

# print(getList());
# @app.route('/user/<user_name>/<int:user_id>')
# def user(user_name, user_id):
#     return f'Welcome, {user_name}({user_id})'


app.run(debug=True)
