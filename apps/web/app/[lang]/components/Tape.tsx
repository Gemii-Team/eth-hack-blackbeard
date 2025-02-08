import { motion } from 'framer-motion';
import { Fragment } from 'react';

const KeyWords = [
    "SECURE",
    "PRIVATE",
    "UNTRACEABLE",
    "DECENTRALIZED",
    "CENSORSHIP RESISTANT",
    "PERMISSIONLESS",
    "OPEN SOURCE",
    "COMMUNITY DRIVEN",
];

interface TapeSectionProps {
    direction?: "ltr" | "rtl";
}

export const TapeSection = ({
    direction = "ltr",
}: TapeSectionProps) => {
    return (
        <div className={`z-50 brounded-2xl bg-gradient-to-r from-emerald-300  to-[#0099ca] -rotate-3 -mx-1 py-4`}>
            <div
                className="flex [mask-image:linear-gradient(to_right, transparent, black_10%, black_90%, not-first:transparent)]"
            >
                <motion.div
                    className="z-50 flex gap-6 whitespace-nowrap animate-marquee"
                    initial={{ x: 0 }}
                    animate={{ x: direction === "ltr" ? "-100%" : "100%" }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                >
                    {[...new Array(1)].fill(0).map((_, index) => (
                        <Fragment key={index}>
                            {...KeyWords.map((word, index) => (
                                <div
                                    key={index}
                                    className="inline-flex items-center space-x-4"
                                >
                                    <span className="text-white uppercase font-extrabold text-2xl">
                                        {word} 🪙
                                    </span>
                                </div>
                            ))}
                        </Fragment>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}