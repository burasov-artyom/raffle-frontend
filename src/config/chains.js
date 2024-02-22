export const chains = !JSON.parse(process.env.NEXT_PUBLIC_IS_TESTNET) ? [{
    id: 1231,
    name: `Ultron`,
    network: `ultron`,
    nativeCurrency: {
        decimals: 18,
        name: `ULX`,
        symbol: `ULX`
    },
    rpcUrls: {
        default: {
            http: [`https://ultron-rpc.net`],
            webSocket: [`wss://wss.ultron-rpc.net`],
        },
        public: {
            http: [`https://ultron-rpc.net`],
            webSocket: [`wss://wss.ultron-rpc.net`],
        }
    },
    blockExplorers: {
        etherscan: {
            name: `UlxScan`,
            url: `https://ulxscan.com`
        },
        default: {
            name: `UlxScan`,
            url: `https://ulxscan.com`
        }
    },
    contracts: {
        raffle: {
            id: 0,
            address: `0x9576930077715721ec668f3F78c88d2160E32688`,
        },
    },
}] : [{
    id: 1230,
    name: `Ultron(T)`,
    network: `ultron-testnet`,
    nativeCurrency: {
        decimals: 18,
        name: `ULX`,
        symbol: `ULX`
    },
    rpcUrls: {
        default: {
            http: [`https://ultron-dev.io`],
            webSocket: [`wss://wss.ultron-dev.io`],
        },
        public: {
            http: [`https://ultron-dev.io`],
            webSocket: [`wss://wss.ultron-dev.io`],
        }
    },
    blockExplorers: {
        etherscan: {
            name: `UlxScan`,
            url: `https://explorer.ultron-dev.io`
        },
        default: {
            name: `UlxScan`,
            url: `https://explorer.ultron-dev.io`
        }
    },
    contracts: {
        raffle: {
            id: 0,
            address: `0x9576930077715721ec668f3F78c88d2160E32688`,
        },
    },
}]
