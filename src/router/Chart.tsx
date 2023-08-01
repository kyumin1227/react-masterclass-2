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
            curve: "smooth",
            width: 3,
        }
    }} type="line" series={[
        {
            name: "Price",
            data: data?.map((price) => Number(price.close))??[],
        }
    ]} />}</div>
}

export default Chart;