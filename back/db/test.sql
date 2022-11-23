-- 전일 정보 불러오기
SELECT DAY, close,
IFNULL(LAG(close,1)over(ORDER BY day desc),0) AS close2
FROM kosdak_000250_m
LIMIT 2;

-- 전일 증가분(등락가) 구하기
SELECT A.day, A.close, A.close-close2
FROM (
SELECT day, close,
IFNULL(LAG(close,1)over(ORDER BY day desc),0) AS close2
FROM kosdak_000250_m
LIMIT 2
) AS A;

-- 전일 증가분(등락가, 등락률)
SELECT A.day AS'날짜' , A.close AS'종가', A.close-A.close2 AS'등락가', (A.close-A.close2)/A.close2*100 AS'등락율'
FROM (
	SELECT day, close,
	IFNULL(LAG(close,1)over(ORDER BY day desc),0) AS close2
	FROM kosdak_000250_m
	LIMIT 2
) AS A;