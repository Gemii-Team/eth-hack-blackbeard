import Image from 'next/image';

const partners = [

    {
        name: "AWS",
        image: "/assets/linea.svg",
        color: "bg-blue-300 text-black"
    },
    {
        name: "Coinbase",
        image: "/assets/base.svg",
        color: "bg-blue-500 text-white"
    },
    {
        name: "Nethermind",
        image: "/assets/bnb.svg",
        color: "bg-yellow-500 text-black"
    },
    {
        name: "Giant",
        image: "assets/opbnb.svg",
        color: "bg-gray-800 text-yellow-400"
    }
];

export default function Partner() {
    return (
        <section className="py-16 w-full ">
            <div className="container mx-auto flex flex-wrap justify-center gap-4 mb-6">
                <div className="text-white text-center w-full">
                    <h2 className="text-4xl font-extrabold pt-12">Our Partners</h2>
                    <p className="text-gray-400 font-extralight pt-6">We collaborate with the best in the industry</p>
                </div>
                {partners.map((d, index) => (
                    <div 
                        key={index} 
                        className={`flex items-center px-4 py-2 pt-4 rounded-full ${d.color} shadow-md transition-all hover:scale-105`}
                    >

                        <span className="font-semibold">{d.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
