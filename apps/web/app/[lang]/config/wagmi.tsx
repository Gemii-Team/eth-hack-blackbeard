import { http, cookieStorage, createConfig, createStorage } from 'wagmi';
import { base } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';

import { Config } from 'wagmi';

export function getConfig(): Config {
    return createConfig({
        chains: [base], 
        connectors: [
            coinbaseWallet({
                appName: 'OnchainKit',
                preference: 'smartWalletOnly',
                version: '4',
            }),
        ],
        storage: createStorage({
            storage: cookieStorage,
        }),
        ssr: true,
        transports: {
            [base.id]: http(),
        },
    });
}

declare module 'wagmi' {
    interface Register {
        config: ReturnType<typeof getConfig>;
    }
}