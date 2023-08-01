import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { useOutletContext } from "react-router-dom";

interface IChartProps {
    coinId: string;
}

function Chart() {

    const {coinId} = useOutletContext<IChartProps>();
    console.log("chart", coinId);
    

    const { isLoading, data } = useQuery(["chart", coinId], () => fetchCoinHistory(coinId));
    
    return <h1>Chart</h1>
}

export default Chart;