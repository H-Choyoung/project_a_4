from flask import Flask, Blueprint, jsonify
# from routes import main
# import os
# import dotenv
# from config import db


app = Flask(__name__)


# app.register_blueprint(main.api)



@app.route("/")
def hello_world():
    print('Test!!')
    return "<p>Hello, World!</p>"


# @app.route("/ho")
# def test():
#     db_class = db.Database()
#     sql      = "SELECT * FROM kospi_005930_d WHERE day BETWEEN '2000-10-05' AND '2000-10-20';"
#     row      = db_class.executeAll(sql)
#     return jsonify(row)

    