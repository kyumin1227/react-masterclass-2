import { useParams, useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { useState } from "react";


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

interface RouteState {
    state: {
        name: string;
    }
}

function Coin() {
    const [loading, setLoading] = useState(true);
    const { coinId } = useParams();
    const { state } = useLocation() as RouteState;
    console.log(state.name);

    return (<Container>
        <Header>
            <Title>{state?.name || "Loading..."}</Title>
        </Header>
        {loading ? <Loader>loading...</Loader> : null}
    </Container>);
    
}

export default Coin;