import { TypeAnimation } from "react-type-animation";
import AnnouncementCard from "./card-annoucemrnts";
import Image from "next/image";

import bitcoin from "../../../public/coin/bitcoin-btc-logo.svg";
import ethereum from "../../../public/coin/ethereum-eth-logo.svg";
import usd from "../../../public/coin/usd-coin-usdc-logo.svg";
import arbitrum from "../../../public/coin/arbitrum-arb-logo.svg";
import flow from "../../../public/coin/flow-flow-logo.svg";
import { useState } from "react";

export default function Hero() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const coins = [
        { name: 'Bitcoin', price: '$48,234', position: 'top-[320px] left-[160px]', delay: '0s', logo: bitcoin },
        { name: 'Ethereum', price: '$2,845', position: 'bottom-[730px] right-[300px]', delay: '0.3s', logo: ethereum },
        { name: 'USDC', price: '$1.00', position: 'bottom-[220px] right-[520px]', delay: '0.5s', logo: usd },
        { name: 'Arbitrum', price: '$1.75', position: 'bottom-[320px] left-[260px]', delay: '0.2s', logo: arbitrum },
        { name: 'Flow', price: '$0.89', position: 'bottom-[420px] right-[260px]', delay: '0.4s', logo: flow }
    ];

    return (
        <section className="relative h-screen flex flex-col justify-center items-center text-center text-white px-6">
            <div className="z-30 absolute top-4 w-full flex justify-center px-4 mt-8">
                <AnnouncementCard />
            </div>

            <div className="z-10 flex flex-col items-center justify-center">
                <h1 className="uppercase font-extrabold text-5xl md:text-7xl mb-4 leading-tight tracking-wide">
                    Welcome to
                </h1>

                <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-[#FFCC00]">
                    <TypeAnimation
                        sequence={[
                            "BLACKBEARD", 1000,
                            "블랙비어드", 1000,
                            "काली दाढ़ी", 1000,
                            "หนวดดำ", 1000,
                            "கருப்பு முடி", 1000,
                            "Barbanegra", 1000,
                            "Schwarzer Bart", 1000,
                        ]}
                        wrapper="span"
                        speed={50}
                        style={{ display: "inline-block" }}
                        repeat={Infinity}
                    />
                </h2>

                <p className="text-lg md:text-2xl text-gray-300 mt-2 max-w-lg">
                    🚀 Trade Bitcoin like chatting with a friend.
                </p>
                <div className="flex items-center justify-center gap-4 ">
                    <button className="mt-8 px-6 py-3 bg-[#3399FF] text-white rounded-full text-lg font-semibold shadow-xl transform transition hover:scale-105 hover:bg-[#66B2FF] focus:outline-none focus:ring-4 focus:ring-[#66B2FF] cursor-pointer">
                        Get Started
                    </button>
                    <button className="mt-8 px-8 py-3 border-slate-200 border-2 rounded-full text-lg font-semibold shadow-xl transform transition hover:scale-105 cursor-pointer">
                        Trade
                    </button>
                </div>

            </div>

            {/* Coins */}
            {coins.map((coin, index) => (
                <div
                    key={coin.name}
                    className={`absolute ${coin.position} z-50 transition-all duration-300 cursor-pointer`}
                    style={{
                        animation: `float 3s ease-in-out infinite`,
                        animationDelay: coin.delay
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <div className="relative group">
                        {/* Coin Logo */}
                        <div
                            className={`w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center
                            ${hoveredIndex !== null && hoveredIndex !== index ? 'blur-sm opacity-30' : 'opacity-80'} 
                            transition-all duration-300 ease-in-out`}
                        >
                            <Image
                                src={coin.logo}
                                alt={coin.name}
                                width={120}
                                height={120}
                                className="transition-all duration-300 ease-in-out"
                            />
                        </div>

                        {/* Price Tooltip */}
                        <div
                            className={`absolute -top-10 left-1/2 transform -translate-x-1/2 
                            bg-white text-gray-900 px-3 py-1 rounded-lg text-sm font-medium
                            whitespace-nowrap z-20 transition-all duration-300
                            ${hoveredIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                        >
                            {coin.price}
                        </div>
                    </div>
                </div>
            ))}

            <style jsx>{`
                @keyframes float {
                    0% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0); }
                }
            `}</style>
        </section>
    );
}
