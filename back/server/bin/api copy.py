import os
import sys
import urllib.request

client_id = "_85wvqThYJUdir8dWo5o"
client_secret = "gmaG1XD16B"
encText = urllib.parse.quote("삼성전자")
url = "https://openapi.naver.com/v1/search/news.json?query=" + encText # JSON 결과


request = urllib.request.Request(url)
request.add_header("X-Naver-Client-Id",client_id)
request.add_header("X-Naver-Client-Secret",client_secret)
response = urllib.request.urlopen(request)
rescode = response.getcode()
if(rescode==200):
    response_body = response.read()
    print(response_body.decode('utf-8'))
else:
    print("Error Code:" + rescode)