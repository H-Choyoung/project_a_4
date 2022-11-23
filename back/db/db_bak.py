import pymysql


def getList():
    # *DB connect
    conn = pymysql.connect(host='127.0.0.1', user='root',
                           password='1234', port=3306, db='aitrading_db', charset='utf8')
    try:
        curs = conn.cursor(pymysql.cursors.DictCursor)
        sql = f"""
        SELECT close
        FROM kosdak_000250_m
        WHERE day
        BETWEEN '2021-02-01' AND '2022-02-03'
        """
        curs.execute(sql)
        # *객체에서 데이터 가져오기 : fetch
        rows = curs.fetchall()
        # *전체 row 출력
        # for i in rows:
        #     print(i)
        # *부분 row 출력
        list = []
        for row in rows:
            print(row)
            list.append(row)
    finally:
        # *연결 닫기
        conn.close()
        return list


getList()
