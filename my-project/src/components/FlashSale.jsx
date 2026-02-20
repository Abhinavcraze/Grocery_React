import React, { useState, useEffect } from 'react';

const FlashSale = ({ addToCart }) => {
    const [timeLeft, setTimeLeft] = useState(15 * 60);
    const [stocks, setStocks] = useState({
        item1: { qty: 3, prog: 30 },
        item2: { qty: 7, prog: 55 },
        item3: { idx: 12, prog: 80 }
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
            
            // Stock decrease simulation every few seconds
            if (timeLeft % 8 === 0) setStocks(s => ({...s, item1: {qty: Math.max(0, s.item1.qty - 1), prog: Math.max(0, s.item1.prog - 5)}}));
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `00:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <section id="flash-sale" className="max-w-7xl mx-auto px-4 mt-8 mb-12">
            <div className="bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 rounded-[3rem] p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 relative z-10 gap-4">
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl font-black italic tracking-tighter flex items-center gap-3">
                            <i className="fa-solid fa-bolt-lightning text-yellow-300 animate-pulse"></i>
                            FLASH <span className="text-yellow-300 uppercase">SALE</span>
                        </h2>
                        <p className="text-red-100 font-bold text-sm">Quantities are limited. Prices increase when timer hits zero!</p>
                    </div>
                    <div className="bg-black/30 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Ends In</span>
                        <span className="font-mono text-2xl font-black text-yellow-400">{formatTime(timeLeft)}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    {/* Item 1 */}
                    <div className="bg-white text-gray-500 p-5 rounded-[2.5rem] shadow-xl flex flex-col">
                        <div className="relative mb-4">
                            <img src="https://loremflickr.com/400/400/grocery,mango" className="w-full h-32 object-cover rounded-2xl" alt="mango"/>
                            <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-lg">40% OFF</span>
                        </div>
                        <h4 className="font-black text-sm mb-1">Alphonso Mango (Sale)</h4>
                        <div className="flex items-end gap-2 mb-4">
                            <span className="text-2xl font-black text-red-600">₹270</span>
                            <span className="text-xs text-gray-400 line-through mb-1">₹450</span>
                        </div>
                        <div className="mt-auto">
                            <div className="flex justify-between text-[10px] font-black uppercase mb-1">
                                <span className="text-red-600">Only {stocks.item1.qty} Left</span>
                                <span className="text-gray-400">Sold 70%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                                <div className="h-full bg-red-600 transition-all duration-1000" style={{width: `${stocks.item1.prog}%`}}></div>
                            </div>
                            <button onClick={() => addToCart({id: 'f1', name: 'Alphonso Mango (Flash)', img: 'https://loremflickr.com/400/400/grocery,mango'}, 270)} className="w-full bg-gray-900 text-white py-3 rounded-xl font-black text-xs">CLAIM DEAL</button>
                        </div>
                    </div>
                    {/* Repeat for other Flash items similarly... */}
                </div>
            </div>
        </section>
    );
};

export default FlashSale;