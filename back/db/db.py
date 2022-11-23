import pymysql


class Database():
    def __init__(self):
        # *DB connect
        self.conn = pymysql.connect(host='127.0.0.1', user='root',
                                    password='1234', port=3306, db='aitrading_db', charset='utf8')
        self.cursor = self.conn.cursor(pymysql.cursors.DictCursor)

    def execute(self, query, args={}):
        self.cursor.execute(query, args)

    def executeOne(self, query, args={}):
        self.cursor.execute(query, args)
        row = self.cursor.fetchone()
        return row

    def executeAll(self, query, args={}):
        self.cursor.execute(query, args)
        row = self.cursor.fetchall()
        return row
    
    def close(self):
        self.conn.close()


# sql = f"""
#     SELECT close
#     FROM kosdak_000250_m
#     WHERE day
#     BETWEEN '2021-02-01' AND '2022-02-03'
#     """

# if __name__ == '__main__':
#     if __package__ is None:
#         import sys
#         from os import path
#         print(path.dirname(path.dirname(path.abspath(__file__))))
#         sys.path.append(path.dirname(path.dirname(path.abspath(__file__))))
#         from db.db_2 import db_2
#     else:
#         from .db_2 import db_2
