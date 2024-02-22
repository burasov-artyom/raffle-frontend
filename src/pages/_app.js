import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { WagmiProvider, cookieStorage, createStorage } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'

import { store } from "@/services/store";

import { chains } from "@/config/chains";

import "@/styles/globals.css";

const queryClient = new QueryClient();

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
  metadata: {
    name: `Web3Modal`,
    description: `Web3Modal Example`,
    url: `https://web3modal.com`,
    icons: [`https://avatars.githubusercontent.com/u/37784886`]
  },
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
  enableWalletConnect: true,
  enableInjected: true,
  enableEIP6963: true,
  enableCoinbase: true,
})

createWeb3Modal({
  wagmiConfig,
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
  chains,
  enableAnalytics: true,
  themeMode: `light`
});

export default function App({ Component, pageProps }) {
  return (
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <Provider store={store}>
              <Component {...pageProps} />
            </Provider>
          </ChakraProvider>
        </QueryClientProvider>
      </WagmiProvider>
  );
}
