import pymysql
import os
import sys
# from dotenv import load_dotenv

config = {
    "user":os.environ.get("MARIADB_USER"),
    "password":os.environ.get("MARIADB_PASSWORD"),
    "host":os.environ.get("MARIADB_HOST"),
    "port":int(os.environ.get("MARIADB_PORT")),
    "database":os.environ.get("MARIADB_DB")
}


class Database:
    def __init__(self):
        try:
            self.db = pymysql.connect(**config)
            self.cursor = self.db.cursor(pymysql.cursors.DictCursor)
        except pymysql.Error as e:
            print(f"Error connecting to MariaDB Platform: {e}")
            sys.exit(1)
        
    def execute(self, query, args={}):
        self.cursor.execute(query, args)
        return

    def excuteOne(self, query, args={}):
        self.cursor.execute(query, args)
        row = self.cursor.fetchone()
        return row

    def executeAll(self, query, args={}):
        self.cursor.execute(query, args)
        row = self.cursor.fetchall()
        return row

    def commit(self):
        self.db.commit()
        