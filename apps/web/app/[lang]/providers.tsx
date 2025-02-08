"use client";

import { OnchainKitProvider } from "@coinbase/onchainkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { arbitrum, base, mainnet, optimism, polygon } from "wagmi/chains";
import { ReactNode, useMemo } from "react";
import { cookieStorage, createConfig, createStorage, http, WagmiProvider, type State } from "wagmi";
import {
    RainbowKitProvider,
    lightTheme,
    darkTheme,
} from '@rainbow-me/rainbowkit';
import {
    rainbowWallet,
    walletConnectWallet,
    binanceWallet,
    
} from '@rainbow-me/rainbowkit/wallets';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import React from "react";

const connectors = connectorsForWallets(
    [
        {
            groupName: 'Recommended',
            wallets: [rainbowWallet, walletConnectWallet, binanceWallet ],
        },
    ],
    {
        appName: 'My RainbowKit App',
        projectId: 'YOUR_PROJECT_ID',
    }
);

const config = createConfig({
    connectors,
    chains: [
        mainnet,
        arbitrum,
        optimism,
        polygon,
    ],
    storage: createStorage({
        storage: cookieStorage,
    }),
    ssr: true,
    transports: {
        [base.id]: http(),
        [mainnet.id]: http(),
        [arbitrum.id]: http(),
        [optimism.id]: http(),
        [polygon.id]: http(),
    },
});


export default function Providers({
    children,
    initialState,
}: {
    children: ReactNode;
    initialState?: State;
}) {
    const queryClient = useMemo(() => new QueryClient(), []);

    const apiKey = process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY;
    if (!apiKey) {
        throw new Error("REACT_APP_ONCHAINKIT_API_KEY is missing in the environment variables");
    }

    return (
        <ErrorBoundary>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <OnchainKitProvider
                        apiKey={apiKey}
                        chain={base}
                    >
                        <RainbowKitProvider
                            modalSize="compact"
                            theme={{
                                lightMode: lightTheme(),
                                darkMode: darkTheme(),
                            }}
                        >
                            {children}
                        </RainbowKitProvider>
                    </OnchainKitProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </ErrorBoundary>
    );
}

// Basic ErrorBoundary component to catch errors in the provider tree
class ErrorBoundary extends React.Component<{ children: ReactNode }> {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <div>Something went wrong. Please try again later.</div>;
        }

        return this.props.children;
    }
}
