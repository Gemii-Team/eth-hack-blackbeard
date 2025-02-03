
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
    return (
        <section className="relative w-full h-screen bg-gradient-animated text-white flex flex-col justify-center items-center text-center">
            <div className="relative z-10">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="flex text-8xl md:text-6xl font-bold mb-4">
                        Welcome to{" "}
                    </h1>
                    <h2 className=" flex text-center text-4xl md:text-6xl font-bold mb-4">
                        <TypeAnimation
                            sequence={[
                                "Beaver",
                                1000,
                                "턱수염 을 기른 사람",
                                1000,
                                "ਬੀਵਰ",
                                1000,
                                "บีเวอร์",
                                1000,
                                "Бобр",
                                1000,
                            ]}
                            wrapper="span"
                            speed={50}
                            style={{ fontSize: "3.75rem", display: "inline-block" }}
                            repeat={Infinity}
                        />
                    </h2>
                </div>
                <h2 className="text-center text-lg md:text-2xl">
                    🚀 Trade Bitcoin like chatting with a friend.
                </h2>
                <button className="mt-8 px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg text-lg font-semibold shadow-lg transform transition hover:scale-105">
                    Get Started
                </button>
            </div>
        </section>
    )
}