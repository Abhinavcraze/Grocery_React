import React, { useState, useEffect } from 'react';

const FlashSale = ({ addToCart }) => {
    // 1. Initialize State first
    const [timeLeft, setTimeLeft] = useState(15 * 60);
    const [stocks, setStocks] = useState({
        item1: { qty: 3, prog: 30, max: 10, claimed: false },
        item2: { qty: 7, prog: 45, max: 15, claimed: false },
        item3: { qty: 12, prog: 60, max: 20, claimed: false }
    });

    // 2. Declare helper functions BEFORE useEffect to avoid declaration errors
    const updateStockLocally = (itemId) => {
        setStocks(prev => {
            const item = prev[itemId];
            if (item.qty > 0) {
                const newQty = item.qty - 1;
                const newProg = (newQty / item.max) * 100;
                return { ...prev, [itemId]: { ...item, qty: newQty, prog: newProg } };
            }
            return prev;
        });
    };

    const handleClaim = (itemId, productData, price) => {
        addToCart(productData, price);
        setStocks(prev => ({
            ...prev,
            [itemId]: { ...prev[itemId], claimed: true }
        }));
        setTimeout(() => {
            setStocks(prev => ({
                ...prev,
                [itemId]: { ...prev[itemId], claimed: false }
            }));
        }, 2000);
    };

    const formatTime = (s) => {
        if (s <= 0) return "EXPIRED";
        const hrs = Math.floor(s / 3600);
        const mins = Math.floor((s % 3600) / 60);
        const secs = s % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // 3. Now the useEffect can safely access the functions above
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });

            // Randomly decrease stock for all 3 products
            if (timeLeft % 8 === 0) updateStockLocally('item1');
            if (timeLeft % 12 === 0) updateStockLocally('item2');
            if (timeLeft % 5 === 0) updateStockLocally('item3');

        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]); // Dependency ensures it has access to the current timer value

    const flashProducts = [
        {
            key: 'item1',
            id: 'FLASH-1',
            name: 'Alphonso Mango (Flash)',
            img: 'https://loremflickr.com/400/400/grocery,mango',
            salePrice: 270,
            oldPrice: 450,
            discount: '40% OFF'
        },
        {
            key: 'item2',
            id: 'FLASH-2',
            name: 'Pure Cow Milk (Flash)',
            img: 'https://loremflickr.com/400/400/grocery,milk',
            salePrice: 64,
            oldPrice: 128,
            discount: '50% OFF'
        },
        {
            key: 'item3',
            id: 'FLASH-3',
            name: 'Fresh Paneer (Flash)',
            img: 'https://loremflickr.com/400/400/grocery,paneer',
            salePrice: 161,
            oldPrice: 230,
            discount: '30% OFF'
        }
    ];

    return (
        <section id="flash-sale" className={`max-w-7xl mx-auto px-4 mt-8 mb-12 ${timeLeft <= 0 ? 'grayscale opacity-50 pointer-events-none' : ''}`}>
            <div className="bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 rounded-[3rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-red-100">
                
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 relative z-10 gap-4">
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl font-black italic tracking-tighter flex items-center justify-center md:justify-start gap-3">
                            <i className="fa-solid fa-bolt-lightning text-yellow-300 animate-pulse"></i>
                            FLASH <span className="text-yellow-300 uppercase">SALE</span>
                        </h2>
                        <p className="text-red-100 font-bold text-sm">Quantities are limited. Prices increase when timer hits zero!</p>
                    </div>
                    <div className="bg-black/30 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Ends In</span>
                        <span className="font-mono text-2xl font-black text-yellow-400 tracking-tighter">
                            {formatTime(timeLeft)}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    {flashProducts.map((prod) => {
                        const stockInfo = stocks[prod.key];
                        return (
                            <div key={prod.key} className="bg-white text-gray-500 p-5 rounded-[2.5rem] shadow-xl hover:scale-[1.02] transition-transform flex flex-col">
                                <div className="relative mb-4">
                                    <img src={prod.img} className="w-full h-32 object-cover rounded-2xl" alt={prod.name} />
                                    <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-lg">
                                        {prod.discount}
                                    </span>
                                </div>
                                <h4 className="font-black text-sm mb-1 text-gray-800">{prod.name}</h4>
                                <div className="flex items-end gap-2 mb-4">
                                    <span className="text-2xl font-black text-red-600">₹{prod.salePrice}</span>
                                    <span className="text-xs text-gray-400 line-through mb-1">₹{prod.oldPrice}</span>
                                </div>
                                
                                <div className="mt-auto">
                                    <div className="flex justify-between text-[10px] font-black uppercase mb-1">
                                        <span className={stockInfo.qty < 5 ? 'text-red-600 font-bold' : 'text-gray-600'}>
                                            Only {stockInfo.qty} Left
                                        </span>
                                        <span className="text-gray-400 font-bold">Sold {100 - Math.round(stockInfo.prog)}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
                                        <div 
                                            className={`h-full transition-all duration-1000 ${stockInfo.qty < 5 ? 'bg-red-600' : 'bg-green-500'}`}
                                            style={{ width: `${stockInfo.prog}%` }}
                                        ></div>
                                    </div>
                                    <button
                                        onClick={() => handleClaim(prod.key, { id: prod.id, name: prod.name, img: prod.img }, prod.salePrice)}
                                        className={`w-full py-3 rounded-xl font-black text-xs transition-all ${
                                            stockInfo.claimed 
                                            ? 'bg-green-600 text-white' 
                                            : 'bg-gray-900 text-white hover:bg-black'
                                        }`}
                                    >
                                        {stockInfo.claimed ? 'CLAIMED!' : 'CLAIM DEAL'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FlashSale;