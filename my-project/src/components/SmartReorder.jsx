import React, { useState } from 'react';

const SmartReorder = ({ addToCart }) => {
    // FIX: Initialize state directly from localStorage
    // This prevents the "cascading render" error by setting the data before the first paint
    const [history] = useState(() => {
        const savedHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
        return savedHistory;
    });

    const [isListVisible, setIsListVisible] = useState(false);

    // If there is no history, we don't render the section at all (matches original logic)
    if (!history || history.length === 0) return null;

    return (
        <section id="reorder-hub" className="max-w-7xl mx-auto px-4 mt-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                        <i className="fa-solid fa-rotate-right"></i>
                    </div>
                    <div>
                        <h3 className="text-xl font-black italic tracking-tight">
                            SMART <span className="text-purple-600">REORDER</span>
                        </h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-1">
                            Based on your frequent purchases
                        </p>
                    </div>
                </div>
                {/* Trigger Button */}
                <button 
                    id="view-history-btn"
                    onClick={() => setIsListVisible(!isListVisible)}
                    className={`text-xs font-black border-b-2 pb-1 transition-colors uppercase ${
                        isListVisible 
                        ? 'text-gray-400 border-gray-200' 
                        : 'text-purple-600 border-purple-200 hover:text-purple-800'
                    }`}
                >
                    {isListVisible ? "HIDE HISTORY" : "VIEW HISTORY"}
                </button>
            </div>

            {/* Scrollable Reorder Cards */}
            <div 
                id="smart-reorder-list"
                className={`${isListVisible ? 'flex' : 'hidden'} gap-4 overflow-x-auto no-scrollbar pb-4 animate-in slide-in-from-top duration-500`}
            >
                {history.map((item, idx) => (
                    <div 
                        key={idx} 
                        className="flex-shrink-0 w-44 bg-white p-4 rounded-[2rem] border border-purple-50 shadow-sm hover:shadow-md transition-all group"
                    >
                        <div className="relative mb-3">
                            <img 
                                src={item.img} 
                                className="w-full h-24 object-cover rounded-2xl group-hover:scale-105 transition-transform" 
                                alt={item.name}
                            />
                            <div className="absolute -bottom-2 -right-1 bg-purple-600 text-white text-[8px] font-black px-2 py-1 rounded-lg shadow-lg">
                                BOUGHT {item.count}x
                            </div>
                        </div>
                        <h5 className="font-bold text-xs text-gray-800 leading-tight h-8 overflow-hidden">
                            {item.name}
                        </h5>
                        <div className="flex items-center justify-between mt-2">
                            <span className="font-black text-sm">₹{item.price}</span>
                            <button 
                                onClick={() => addToCart(item, item.price)} 
                                className="bg-purple-100 text-purple-600 p-2 rounded-xl hover:bg-purple-600 hover:text-white transition-all"
                            >
                                <i className="fa-solid fa-plus text-xs"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SmartReorder;