import sys,os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from flask import Flask, jsonify, json, request
from config import db
from flask_cors import CORS
from urllib.parse import parse_qs, urlencode
from routes import search, main
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

# app.register_blueprint(main.api)
# app.register_blueprint(search.api)






@app.route('/index', methods=["GET"])
def request_Data():

    db_class = db.Database()
    sql = 'SELECT * FROM companylist'
    row = db_class.executeAll(sql)
    # print(row)
    kospi = list(filter(lambda kospi: kospi["market"] == "KOSDAK", row)) 
    kosdak = list(filter(lambda kosdak: kosdak['market'] == "KOSPI", row))
    
    data = {
        "kospi":kospi,
        "kosdak":kosdak,
    }

    response = app.response_class (
        response = json.dumps(data),
        status=200,
        mimetype='application/json'
    )

    return response



@app.route('/detail', methods=["GET"])
def get_URl():

    market = request.args.get('market')
    code = request.args.get('code')
    db_class = db.Database()
    sql = f'SELECT * FROM {market}_{code}_d'
    row = db_class.executeAll(sql)

    frame = pd.DataFrame(row)
    # print(frame)

    # day = frame.read_json['day'].to_json(orient='records')
    day = frame.get('day')
    volume = frame.get('volume')

   

    data = {
        "day":day,
        "volume":volume,
    }
    

    response = app.response_class (
        response = json.dumps(row),
        status=200,
        mimetype='application/json'
    )


    return response

# @app.route('/test', methods=["GET"])
# def request_Data1():

#     return "test"


# @app.route("/search", methods=["GET"])
# def getMain():
#     db_class = db.Database()
#     sql      = "SELECT * FROM kospi_005930_d WHERE day BETWEEN '2000-10-05' AND '2000-10-20';"
#     row      = db_class.executeAll(sql)
#     return jsonify(row)