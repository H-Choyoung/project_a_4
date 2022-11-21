import sys,os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from flask import Flask, jsonify
from config import db
from flask_cors import CORS
from routes import search, main

# print(main,"ggg")

app = Flask(__name__)
CORS(app)


app.register_blueprint(search.api)
app.register_blueprint(main.api)



@app.route("/search")
def test1():
    db_class = db.Database()
    sql      = "SELECT * FROM kospi_005930_d WHERE day BETWEEN '2000-10-05' AND '2000-10-20';"
    row      = db_class.executeAll(sql)
    return jsonify(row)




# @app.route('/main')
# def get():
#     return "test"




# @app.route("/search", methods=["GET"])
# def getMain():
#     db_class = db.Database()
#     sql      = "SELECT * FROM kospi_005930_d WHERE day BETWEEN '2000-10-05' AND '2000-10-20';"
#     row      = db_class.executeAll(sql)
#     return jsonify(row)
