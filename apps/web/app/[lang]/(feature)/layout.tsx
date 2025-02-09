import "../../globals.css";
import '@rainbow-me/rainbowkit/styles.css';

import { Metadata } from "next";
import { i18n, type Locale } from "../../../i18n-config";
import { Kanit } from 'next/font/google'
import Providers from "../providers";


export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

const kanit = Kanit({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
})

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function Root(props: {
    children: React.ReactNode;
    params: Promise<{ lang: Locale }>;
}) {
    const params = await props.params;

    const { children } = props;

    return (
        <html lang={params.lang}>
            <body className={`${kanit}`}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}