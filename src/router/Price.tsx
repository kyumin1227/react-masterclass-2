import { useOutletContext } from "react-router-dom";
import { styled } from "styled-components";

interface IData {
    data: {
        id: string;
        name: string;
        symbol: string;
        rank: number;
        circulating_supply: number;
        total_supply: number;
        max_supply: number;
        beta_value: number;
        first_data_at: string;
        last_updated: string;
        quotes: {
            USD: {
                price: number;
                volume_24h: number;
                volume_24h_change_24h: number;
                market_cap: number;
                market_cap_change_24h: number;
                percent_change_15m: number;
                percent_change_30m: number;
                percent_change_1h: number;
                percent_change_6h: number;
                percent_change_12h: number;
                percent_change_24h: number;
                percent_change_7d: number;
                percent_change_30d: number;
                percent_change_1y: number;
                ath_price: number;
                ath_date: string;
                percent_from_price_ath: number;
            }
        }
    }
}

const PriceContainer = styled.div`
    height: 200px;
    width: 100%;
    /* background-color:  yellow; */
    padding-top: 3%;
`

const PriceInfo = styled.div`
    height: 20%;
    width: auto;
    margin-bottom: 2%;
    padding: 0 10px;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
`

const PriceInfoTitle = styled.span`
    
`

const PriceInfoContent = styled.span`
    
`

function Price() {

    const { data } = useOutletContext<IData>();

    console.log("price ", data);
    
    
    return (
        <PriceContainer>
            <PriceInfo>
                <PriceInfoTitle>Price :</PriceInfoTitle>
                <PriceInfoContent>{data.quotes.USD.price.toFixed(3)}</PriceInfoContent>
            </PriceInfo>
            <PriceInfo>
                <PriceInfoTitle>Ath_price :</PriceInfoTitle>
                <PriceInfoContent>{data.quotes.USD.ath_price.toFixed(3)}</PriceInfoContent>
            </PriceInfo>
            <PriceInfo>
                <PriceInfoTitle>Ath_date :</PriceInfoTitle>
                <PriceInfoContent>{data.quotes.USD.ath_date}</PriceInfoContent>
            </PriceInfo>
            <PriceInfo>
                <PriceInfoTitle>Market_cap :</PriceInfoTitle>
                <PriceInfoContent>{data.quotes.USD.market_cap}</PriceInfoContent>
            </PriceInfo>
        </PriceContainer>
    )
}

export default Price;