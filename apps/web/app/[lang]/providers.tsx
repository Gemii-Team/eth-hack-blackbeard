"use client";

import { OnchainKitProvider } from "@coinbase/onchainkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { base } from "wagmi/chains";
import { type ReactNode, useState } from "react";
import { type State, WagmiProvider } from "wagmi";

import { getConfig } from "./config/wagmi";

export default function Providers(props: {
    children: ReactNode;
    initialState?: State;
}) {
    const [config] = useState(() => getConfig());
    const [queryClient] = useState(() => new QueryClient());

    return (
        <WagmiProvider config={config} initialState={props.initialState}>
            <QueryClientProvider client={queryClient}>
                <OnchainKitProvider
                    apiKey={process.env.ONCHAINKIT_API_KEY}
                    chain={base}
                    config={{
                        appearance: {
                            name: "Your App Name",
                            logo: "https://your-logo.com",
                            mode: "auto",
                            theme: "default",
                        },
                        wallet: {
                            display: "modal",
                            termsUrl: "https://...",
                            privacyUrl: "https://...",
                        },
                    }}
                >
                    {props.children}
                </OnchainKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}