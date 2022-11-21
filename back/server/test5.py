from flask import Flask, request
from flask_cors import CORS

# 서버 띄우기
app = Flask(__name__)

CORS(app) 


@app.route('/value', methods = ['POST'])
def home(): 
      args = request.json
      print(args)
      return 'Hello, World!'
      

if __name__ == '__main__':
    app.run(debug=True)