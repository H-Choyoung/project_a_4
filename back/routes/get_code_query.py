import pymysql

# 특정컬럼(코드)의 값을 list로 반환하는 함수
def getCodes(): 
    # *DB connect
    conn = pymysql.connect(host='127.0.0.1', user='root',
                           password='fullstack305', port=3306, db='aitrading_db', charset='utf8')
    try:
        #코드명 가져오기
        qr = """
        SELECT code
        FROM companylist
        WHERE market='KOSPI'
        """
        curs2 = conn.cursor(pymysql.cursors.DictCursor)
        curs2.execute(qr)
        rows2 = curs2.fetchall()
        codeList = list()
        for code in rows2:
            codeList.append(code['code'])
        # print(codeList) #코드 리스트
        return codeList
    finally:
        conn.close()
        
getCodes()