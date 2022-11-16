from flask import Flask
from flask_cors import CORS
import requests


client_id = "_85wvqThYJUdir8dWo5o"
client_secret = "gmaG1XD16B"
serch_word = '삼성전자'
encode_tpye = 'json' 
max_display = 30
sort = 'sim' #sim 관련도 date 시간순
start = 1

url = f"https://openapi.naver.com/v1/search/news.{encode_tpye}?query={serch_word}&display={str(int(max_display))}&start={str(int(start))}&sort={sort}"

headers = {
  "X-Naver-Client-Id" : client_id,
  "X-Naver-Client-Secret" : client_secret
}

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
  return "homepage"

@app.route(f'/{serch_word}')
def serch_get():
  r = requests.get(url, headers=headers)
  return r.json()

if __name__ == '__main__':
  app.run(port =8080, debug=True)