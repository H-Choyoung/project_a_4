from flask import Flask
from dao import cursor
from flask_cors import CORS


# 서버 띄우기
app = Flask(__name__)

CORS(app) 

app.config['JSON_AS_ASCII'] =False

# 💛회사명 입력시 month테이블 출력💛
@app.route('/companysearch')
def find_code(name:any):    
    print(name)
    return 'Hello, World!'
find_code("삼영")


#  sql = "select market,code from companylist where name LIKE '"+name +"%' " 
#  cursor.execute(sql)
#  rows = cursor.fetchall()
#  print(rows)
#  for i in rows:
#     #   print(i)
#       market = i[0]
#       s1= market.lower()
#       code =i[1]
#     #   print("'"+s1+"_"+code+"_m'" ) 
#       table = (""+s1+"_"+code+"_m")
#       print(table)
#       sql2 = "SELECT open,high FROM "+table+" "
#       print(sql2)
#       cursor2.execute(sql2)
#       rows2 = cursor2.fetchall()  
  
#       for a in rows2:
#         print(a)

 
# conn.commit()

if __name__ == '__main__':
    app.run(debug=True)