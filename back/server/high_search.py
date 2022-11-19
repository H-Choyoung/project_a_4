from flask import Flask
from dao import cursor
from flask_cors import CORS
from flask import request



# 서버 띄우기
app = Flask(__name__)

CORS(app) 

app.config['JSON_AS_ASCII'] =False



# 💛회사명 입력시 month테이블 출력💛
@app.route('/test')
def find_code(name):
 sql = "select market,code from companylist where name LIKE '"+ name +"%' "
 cursor.execute(sql)
 rows = cursor.fetchall()
 print(rows)
 for i in rows:
    #   print(i)
      market = i[0]
      s1= market.lower() #소문자로 바꿈
      code =i[1]
    #   print("'"+s1+"_"+code+"_m'" ) 
      table = (""+s1+"_"+code+"_m")
      print(table)
      sql2 = "SELECT open,high FROM "+table+" "
      print(sql2)
      cursor2.execute(sql2)
      rows2 = cursor2.fetchall()  
  
      for a in rows2:
        print(a)

# find_code("더블유게임즈") 

@app.route('/lee', methods=["POST"])
def home(): 
    print('실행!!!!')
    args = request.json
    market = args['market']
    code = args['code']
    print(market,code)
    return "하이!"

# conn.commit()

if __name__ == '__main__':
    app.run(debug=True)