import pymysql

# 참고용
def getApi(market): 
    # *DB connect
    conn = pymysql.connect(host='127.0.0.1', user='root',
                           password='fullstack305', port=3306, db='aitrading_db', charset='utf8')
    try:
        #코드명 가져오기
        qr = f"""
        SELECT code, market,name
        FROM companylist
        WHERE market='{market}'
        LIMIT 50
        """
        curs2 = conn.cursor(pymysql.cursors.DictCursor)
        curs2.execute(qr)
        rows2 = curs2.fetchall()
        set = list()
        for i in range(len(rows2)):
            code = rows2[i]["code"]
            market = rows2[i]["market"]
            # print([market],[code])
            alter = f"""
            ALTER TABLE {market}_{code}_m 
            ADD code
            VARCHAR(15) DEFAULT "{code}"
            """
            set.append(alter)
            # print(alter)
            curs2.execute(alter)
        conn.commit
    finally:
        conn.close()
# getApi('kospi')
# print(getApi('kospi'))