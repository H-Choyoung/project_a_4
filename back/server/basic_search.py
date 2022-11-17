from flask import Flask, render_template
from dao import cursor
from flask import Flask,jsonify,request
from flask_cors import CORS


# 서버 띄우기
app = Flask(__name__)

CORS(app) 

app.config['JSON_AS_ASCII'] =False #한글 글씨 깨질 때 쓰기 

@app.route('/search')
def home(): 
     if request.method == 'GET': 
        sql =" select market,code from companylist where name LIKE '혜인%'"
        cursor.execute(sql) 
        res =cursor.fetchall()
        print(res)
        return res 
        
      


if __name__ == '__main__':
    app.run(debug=True)
