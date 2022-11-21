from flask import Flask, jsonify, json, request, render_template
from flask_cors import CORS
import pandas as pd
import numpy as np
import sys,os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from config import db
# ----------------- 뷰 컴포넌트 --------------------
from routes.view import example
# from urllib.parse import parse_qs, urlencode
# from routes import search, main
# from dao import cursor

# ? 플라스크 포트 실행 : flask run
app = Flask(__name__)
CORS(app)

# 예시용
@app.route('/example', methods=['GET'])
def exampleRoute():
  # *중요: 모듈객체는 호출이 불가능하기에 아래와 같이 호출해줘야 함 
  return example.example('code') 