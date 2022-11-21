import requests
import pandas as pd 


client_id = "_85wvqThYJUdir8dWo5o"
client_secret = "gmaG1XD16B"

serch_word = '삼성전자 주가'
encode_tpye = 'json' 
max_display = 10
sort = 'sim' #sim 관련도 date 시간순
start = 1

url = f"https://openapi.naver.com/v1/search/news.{encode_tpye}?query={serch_word}&display={str(int(max_display))}&start={str(int(start))}&sort={sort}"

headers = {
  "X-Naver-Client-Id" : client_id,
  "X-Naver-Client-Secret" : client_secret
}
r = requests.get(url, headers=headers)

print(pd.DataFrame(r.json()['items']))

