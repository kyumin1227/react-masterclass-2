import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


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

const CoinsList = styled.ul`
    padding: 0px 20px;
`;

const Coin = styled.li`
    background-color: white;
    color:${props => props.theme.bgColor};
    border-radius: 15px;
    margin-bottom: 10px;
    a {
        display: flex;
        align-items: center;
        transition: color 0.2s ease-in;
        padding: 20px;
    }
    &:hover {
        a {
            color: ${props => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`

const Loader = styled.span`
    text-align: center;
    display: block;
`

const Img = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 10px;
`

interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins() {
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async() => {
            const response = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await response.json();
            setCoins(json.slice(0, 100));
            setLoading(false);
        })();
    }, [])
    return <Container>
        <Header>
            <Title>코인</Title>
        </Header>
        <CoinsList>
            {loading ? <Loader>loading...</Loader> : coins.map(coin => <Coin key={coin.id}>
                {/* state를 통해 값을 전달할 경우 받는 쪽에서는 useLocation 이용 */}
                <Link to={`/${coin.id}`} state={coin}>
                    <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                    {coin.name} &rarr;
                </Link>
            </Coin>)}
        </CoinsList>
    </Container>
}

export default Coins;