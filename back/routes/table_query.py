import pymysql
from routes.get_code_query import getCodes
# 메인 출력용 테이블 쿼리
# 종목명/등락율(전일or전달 기준)/등락가(이번달종가-전달종가)/현재가격(종가)
# 코스피/코스닥 별도? 

def getList():
    # *DB connect
    conn = pymysql.connect(host='127.0.0.1', user='root',
                           password='fullstack305', port=3306, db='aitrading_db', charset='utf8')
    try:
        curs = conn.cursor(pymysql.cursors.DictCursor)
        # 2022.02.03 기간동안의 kospi에 해당하는 모든 테이블을 조인..
        for codes in getCodes():
          sql = """
          SELECT T1.code, T1.name, T2.close, T2.day
          FROM companylist T1
          INNER JOIN kospi_""" + codes + """_m T2
          WHERE T1.code='""" + codes + """'
          AND T2.day ='2022-02-03'
          ORDER BY T2.close
          """
          # print(sql)
          curs.execute(sql)
          
          # *객체에서 데이터 가져오기 : fetch
          rows = curs.fetchall()
          # return rows
          # print(rows)
          # *전체 row 출력
          for i in rows:
            return i
            
    finally:
        # *연결 닫기
        conn.close()

# getList()

        # SELECT T1.name, T2.close, T2.day
        # FROM companylist T1
        # INNER JOIN kospi_066570_m T2
        # WHERE T1.market='KOSPI'
        # AND T2.day ='2022-02-03' 
        # ORDER BY T2.day