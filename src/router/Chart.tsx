import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { useOutletContext } from "react-router-dom";
import ApexChart from "react-apexcharts";


interface IHistorical {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}

interface IChartProps {
    coinId: string;
}

function Chart() {

    const example = new Date(0).toISOString()

    const {coinId} = useOutletContext<IChartProps>();
    console.log("chart", coinId);
    

    const { isLoading, data } = useQuery<IHistorical[]>(["chart", coinId], () => fetchCoinHistory(coinId));
    
    return <div>{isLoading ? "Loading..." : <ApexChart options={{
        theme: {
            mode: "dark",
        },
        chart: {
            height: 500,
            width: 500,
            toolbar: {
                show: false,
            },
            background: "transparent",
        },
        grid:{show: false},
        stroke: {
            curve: "smooth", // 그래프의 커브 굴곡
            width: 3, // 그래프 굵기
        },
        yaxis: {
            show: false, // y축 단위 표시 여부
        },
        xaxis: {
            axisBorder: { show: false }, // x축의 테두리 표시 여부
            axisTicks: { show: false }, // x축의 격자 표시 여부
            labels: { show: false }, // x축 단위 표시 여부
            categories: data?.map((price) => (new Date(price.time_close).toUTCString())), // x축의 값을 설정
            type: "datetime",
        },
        fill: {
            type: "gradient",
            gradient: {gradientToColors: ["blue"], stops: [0, 100]},
        },
        colors: ["red"],
        tooltip: {
            y: {
                formatter: (value) => `$ ${value.toFixed(2)}` // y축의 값을 해당 형식으로 포맷 (앞에 $ 붙이고 숫자는 소수점 둘째자리까지 표시)
            }
        }
    }} type="line" series={[
        {
            name: "Price",
            data: data?.map((price) => Number(price.close))??[],
        }
        ]} />}</div>
}

export default Chart;