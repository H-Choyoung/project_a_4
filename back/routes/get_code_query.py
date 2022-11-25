
from config import db
# 특정컬럼(코드)의 값을 list로 반환하는 함수
def getCodes(market): 
    # *DB connect
    print(market)
    db_class = db.Database()
    try:
        #코드명 가져오기
        qr = f"""
        SELECT code
        FROM companylist
        WHERE market='{market}'
        """

        rows2 = db_class.executeAll(qr)
        codeList = list()
        print(rows2)
        for code in rows2:
            codeList.append(code['code'])
        # print(codeList) #코드 리스트
        return codeList
    finally:
        # db_class.commit()
        print('a')