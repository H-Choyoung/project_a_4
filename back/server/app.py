from flask import Flask, jsonify, json, request, render_template
from flask_cors import CORS
import pandas as pd
import numpy as np
import sys,os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from config import db

# ----------------- 뷰 컴포넌트 --------------------
from routes.view import table
# from urllib.parse import parse_qs, urlencode
# from routes import search, main
# from dao import cursor

# ? 플라스크 포트 실행 : flask run
app = Flask(__name__)
CORS(app)


# 테이블용 데이터(kospi)
# 내용 (code,날짜,등락가,등락율,종가,종목명)
@app.route('/table_data_kospi', methods=['GET'])
def get_kospi():
  return table.kospi_data();

# 테이블용 데이터(kosdaq)
# 내용 (code,날짜,등락가,등락율,종가,종목명)
@app.route('/table_data_kosdaq', methods=['GET'])
def get_kosdaq():
  return table.kosdaq_data();