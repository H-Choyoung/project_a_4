import sys,os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from flask import Flask, json
from config import db
from flask_cors import CORS
from routes.view import graph

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
def detailRoute():
    data = graph.get_graph()
    response = app.response_class (
        response = json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response






    



# @app.route("/search", methods=["GET"])
# def getMain():
#     db_class = db.Database()
#     sql      = "SELECT * FROM kospi_005930_d WHERE day BETWEEN '2000-10-05' AND '2000-10-20';"
#     row      = db_class.executeAll(sql)
#     return jsonify(row)
