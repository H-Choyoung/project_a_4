from flask import Flask, render_template
from flask_cors import CORS



# 서버 띄우기
app = Flask(__name__)


CORS(app) 


@app.route('/value')
def home(): 
      return 'Hello, World!'
      


if __name__ == '__main__':
    app.run(debug=True)
