from flask import Flask, jsonify, json, request, render_template
from flask_cors import CORS
import pandas as pd
import numpy as np
import sys,os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from config import db
# ----------------- 뷰 컴포넌트 --------------------
from routes.view import news
from routes.view import table
from routes.view import graph
# from urllib.parse import parse_qs, urlencode
# from routes import search, main
# from dao import cursor

# ? 플라스크 포트 실행 : flask run
app = Flask(__name__)
CORS(app)

# news---------------------------------------------
@app.route('/', methods=['GET'])
def homeRoute():
  # *중요: 모듈객체는 호출이 불가능하기에 아래와 같이 호출해줘야 함 
  return news.home()

@app.route('/<companyname>')
def company(companyname):
  return news.serch_get(companyname)

#table---------------------------------------------
# 테이블용 데이터(kospi)
# 내용 (code,날짜,등락가,등락율,종가,종목명)
@app.route('/table_data_kospi', methods=['GET'])
def get_kospi():
  print("실행입니다")
  return table.kospi_data();

# 테이블용 데이터(kosdaq)
# 내용 (code,날짜,등락가,등락율,종가,종목명)
@app.route('/table_data_kosdaq', methods=['GET'])
def get_kosdaq():
  return table.kosdaq_data();

#detail---------------------------------------------
@app.route('/detail', methods=["GET"])
def detailRoute():
    data = graph.get_graph()
    response = app.response_class (
        response = json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route('/test', methods=["GET"])
def testData():
    data = graph.get_prediction()
    print(data)
    return data
