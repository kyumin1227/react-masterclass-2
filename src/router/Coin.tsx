import { useParams, useLocation, Routes, Route, Outlet, Link, useMatch } from "react-router-dom";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import Price from "./Price";
import Chart from "./Chart";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";


const queryClient = new QueryClient();


const Container = styled.div`
    max-width: 480px;
    margin: 0 auto;
    padding: 0px 20px;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`

const Loader = styled.span`
    text-align: center;
    display: block;
`
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

interface RouteState {
    state: {
        name: string;
    }
}


// 인터페이스를 생성할 때 가독성을 위해 앞에 대문자 I를 붙이기도 함

// api의 타입 빠르게 생성하는 방법
// 1. 해당 data의 log를 찍고 해당 로그를 우클릭 후 'store object...'을 클릭하여 temp1에 저장한다.
// 2. Object.keys(temp1).join로 해당 data의 키를 string 형태로 가져온다.
// 3. 가져온 string의 ,을 ctrl + d 로 모두 선택한 후 지우기, 엔터로 나열한다.
// 4. 전체 선택 후 alt + shift + i 단축키를 이용하면 각 줄의 가장 뒤로 커서가 가게 된다.
// 5. 마찬가지로 Object.values(temp1).map(v => typeof v).join() 명령어를 통해 값의 type을 받아온다.
// 6. 위와 같이 나열 시켜 잘라내기를 한 후 key에 각 줄 가장 뒤로 커서를 위치 시켜 잘라낸 타입을 붙여넣는다.
interface IInfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}


interface IPriceData {
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
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    };
}

function Coin() {
  const { coinId } = useParams();
  const { state } = useLocation() as RouteState;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  // ReactQuery가 두가지 이상일 경우에는 아래와 같이 isLoading과 data의 이름을 구분
  // 아규먼트를 넣기 위해서는 익명함수를 통해 return
  const {isLoading: infoLoading, data: infoData} = useQuery<IInfoData>(["info", coinId], () => fetchCoinInfo(coinId));
  const {isLoading: tickersLoading, data: tickersData} = useQuery<IPriceData>(["tickers", coinId], () => fetchCoinTickers(coinId));

  const loading = infoLoading || tickersLoading;

  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<IInfoData>();
  // const [priceInfo, setPriceInfo] = useState<IPriceData>();
    
    
  //   useEffect(() => {
  //       (async () => {
  //           const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
  //           console.log(infoData);
  //           const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
  //           console.log(priceData);
  //           setInfo(infoData);
  //           setPriceInfo(priceData);
  //           console.log(info);
  //           console.log(priceInfo);
            
  //           setLoading(false);
  //       })();
  //   }, [coinId])

  return (
    <QueryClientProvider client={queryClient} >
    <Container>
        <Header>
            <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
        </Header>
        {loading ? <Loader>loading...</Loader> : (
          <>
            <Overview>
                <OverviewItem>
                    <span>Rank:</span>
                    <span>{infoData?.rank}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Symbol:</span>
                    <span>${infoData?.symbol}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Open Source:</span>
                    <span>{infoData?.open_source ? "Yes" : "No"}</span>
                </OverviewItem>
            </Overview>
            <Description>{infoData?.description}</Description>
            <Overview>
                <OverviewItem>
                    <span>Total Supply:</span>
                    <span>{tickersData?.total_supply}</span>
                </OverviewItem>
                <OverviewItem>
                    <span>Max Supply:</span>
                    <span>{tickersData?.max_supply}</span>
                </OverviewItem>
            </Overview>
                
            <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

            <Outlet />
        </>
      )}
      </Container>
      </QueryClientProvider>
      );
    
}

export default Coin;