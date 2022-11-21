import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import './components/css/detail.css';
import { ApexOptions } from 'apexcharts';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';

interface Data {
  close: string;
  day: Date;
  high: string;
  low: string;
  // no: string;
  open: string;
  // volume: string;
}

const Detail = () => {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loging, setLoging] = useState<Boolean>(true);
  const navigate = useNavigate();
  // const [count, setCount] = useState<any>([]);
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: 'candlestick',
      height: 350,
    },
    title: {
      text: '',
      align: 'left',
    },
    xaxis: {
      type: 'datetime',
      // type: "category",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  });
  const [series, setSeries] = useState<any>([
    {
      data: [
        [],
        [],
        // {
        //     x: new Date(2016, 1, 1),
        //     y: [6629.81, 6650.5, 6623.04, 6633.33],
        // },
        // {
        //     x: new Date(2016, 2, 5),
        //     y: [6632.01, 6643.59, 6620, 6630.11],
        // },
      ],
    },
  ]);
  useEffect(() => {
    const getData = async () => {
      const company: any = await axios.get<Object>(
        `http://localhost:8080/detail${search}`
      );

      setSeries(() => [
        {
          data: company.data,
        },
      ]);

      setLoging(false);
    };
    getData();
  }, []);

  const onclickDayHandler = async (text: any) => {
    let save: any = searchParams.get('day');
    let urlChange = window.location.search.replace(save, text);

    const getDay: any = await axios.get<Object>(
      `http://localhost:8080/detail${urlChange}`
    );

    console.log(getDay);
    setSeries([
      {
        data: getDay.data,
      },
    ]);
    navigate(urlChange);
  };

  return (
    <div className='detail'>
      {loging ? (
        <div>로딩중 입니다 잠시만 기다려주세요</div>
      ) : (
        <div className='section'>
          <div className='wrapArrow'>
            <div>
              <FaLongArrowAltLeft
                size={48}
                cursor={'pointer'}
                onClick={() => {
                  navigate(-1);
                }}
              />
              <p>{searchParams.get('company')}</p>
            </div>

            <div className='search'>
              <input type='text' placeholder='검색어 입력' />
              <AiOutlineSearch size={24} cursor={'pointer'} />
            </div>
          </div>
          <div className='chart'>
            <ReactApexChart
              options={options}
              series={series}
              type='candlestick'
            />
          </div>
          <div className='info'>
            <div>
              <label>등락율:</label>
              <div className='font_color_red font_weight_700'>+4.14%</div>
            </div>
            <div>
              <label>전일대비:</label>
              <div className='font_color_red font_weight_700'>+2400원</div>
            </div>
            <div>
              <label>현재가격:</label>
              <div className='font_weight_700'>62,900원</div>
            </div>
          </div>
          <div className='btn_wrap'>
            <button
              className='btn font_weight_700 font_size_18'
              onClick={() => onclickDayHandler('month')}
            >
              1개월
            </button>
            <button
              className='btn font_weight_700 font_size_18'
              onClick={() => onclickDayHandler('year')}
            >
              1년
            </button>
          </div>
          <div className='recommend'>
            <button>매수 적극 추천</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
