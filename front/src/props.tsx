import React, { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import "./components/css/detail.css";
import { Data } from "App";
import { ApexOptions } from "apexcharts";

const Props = ({ data }: { data: Data }) => {
    console.log(data);
    return <div className="detail"></div>;
};

export default Props;
