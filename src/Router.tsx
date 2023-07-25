import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coins from "./router/Coins";
import Coin from "./router/Coin";
import Price from "./router/Price";
import Chart from "./router/Chart";

function Router() {
    return <BrowserRouter>
        <Routes>
            <Route path="/:coinId" element={<Coin />} >
                <Route path="price" element={<Price />} />
                <Route path="chart" element={<Chart />} />
            </Route>
            <Route path="/" element={<Coins />} />
        </Routes>
    </BrowserRouter>
}

export default Router;