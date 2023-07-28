import { QueryClient, QueryClientProvider } from "react-query";


const queryClient = new QueryClient();

function Price() {
    return (<QueryClientProvider client={queryClient}>
        <h1>Price</h1>
    </QueryClientProvider>);
}

export default Price;