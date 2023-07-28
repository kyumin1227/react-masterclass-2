import { QueryClient, QueryClientProvider } from "react-query";


const queryClient = new QueryClient();

function Chart() {
    return (<QueryClientProvider client={queryClient}>
            <h1>Chart</h1>
        </QueryClientProvider>
    )
}

export default Chart;