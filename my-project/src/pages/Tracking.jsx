import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Tracking.css';

const Tracking = () => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(582); // 9:42 in seconds
    
    // REMOVED 'setOrderTotal' as it is not used in this view
    const [orderTotal] = useState(localStorage.getItem('orderTotal') || '₹0');
    
    const [showItems, setShowItems] = useState(false);
    const purchasedItems = JSON.parse(localStorage.getItem('purchasedItems') || '[]');

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const confirmReceipt = () => {
        const confirmed = window.confirm("Confirm delivery receipt? This releases escrow payment.");
        if (confirmed) {
            alert("Funds released! Thank you for shopping.");
            localStorage.removeItem('orderTotal');
            localStorage.removeItem('purchasedItems');
            navigate('/store');
        }
    };

    return (
        <div className="pb-20 bg-[#f8fafc] min-h-screen font-['Outfit']">
            <header className="p-6 bg-white border-b flex justify-between items-center sticky top-0 z-50">
                <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Order ID: #PF-88323</p>
                    <h1 className="text-xl font-black text-green-800">Tracking Delivery</h1>
                </div>
                <button onClick={() => navigate('/store')} className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-all">
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </header>

            <main className="max-w-4xl mx-auto px-4 mt-6">
                {/* Live Map Simulation */}
                <div className="map-sim rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-white mb-8">
                    <div className="absolute inset-0 bg-green-900/10 pointer-events-none"></div>
                    <div className="absolute top-[60%] right-[20%] text-red-600">
                        <i className="fa-solid fa-location-dot text-4xl drop-shadow-lg"></i>
                        <div className="bg-white px-3 py-1 rounded-lg text-[10px] font-bold shadow-xl mt-1 text-center">HOME</div>
                    </div>
                    <div className="rider-dot">
                        <div className="bg-green-600 text-white p-3 rounded-full shadow-2xl relative">
                            <i className="fa-solid fa-motorcycle text-xl"></i>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-green-600 rounded-full animate-ping"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-5 gap-6">
                    <div className="md:col-span-3 space-y-6">
                        {/* Countdown Card */}
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center justify-between overflow-hidden relative">
                            <div className="z-10">
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Estimated Arrival</p>
                                <h2 className="text-5xl font-black text-gray-900 tracking-tighter" id="timer">{formatTime(timeLeft)}</h2>
                                <p className="text-green-600 font-bold text-sm mt-2 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full status-pulse"></span> Your Rider is 1.2km away
                                </p>
                            </div>
                            <i className="fa-solid fa-clock text-[8rem] text-gray-50 absolute right-[-20px] top-[-20px]"></i>
                        </div>

                        {/* Status Timeline */}
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                            <h3 className="font-black text-lg mb-6">Delivery Progress</h3>
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm"><i className="fa-solid fa-check"></i></div>
                                        <div className="w-0.5 h-10 bg-green-100"></div>
                                    </div>
                                    <div>
                                        <p className="font-black text-sm">Order Confirmed</p>
                                        <p className="text-xs text-gray-400">1:21 PM • Payment Authorized</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm animate-bounce"><i className="fa-solid fa-motorcycle"></i></div>
                                    </div>
                                    <div>
                                        <p className="font-black text-sm text-green-700 underline">Out for Delivery</p>
                                        <p className="text-xs text-gray-500">Arul is on his way to your location</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 text-center">
                            <img src="https://i.pravatar.cc/150?u=rider" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-green-50 p-1" alt="rider"/>
                            <h4 className="font-black text-xl">Arul Kumar</h4>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Partner • 4.9 <i className="fa-solid fa-star text-yellow-400"></i></p>
                            <div className="flex gap-3">
                                <button className="flex-1 bg-green-100 text-green-700 py-3 rounded-2xl font-black text-sm hover:bg-green-200 transition-all"><i className="fa-solid fa-phone mr-2"></i> CALL</button>
                                <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-2xl font-black text-sm hover:bg-gray-200 transition-all"><i className="fa-solid fa-message mr-2"></i> CHAT</button>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100">
                             <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Order Value</p>
                                    <p className="font-black text-lg">{orderTotal}</p>
                                </div>
                                <button onClick={() => setShowItems(true)} className="text-green-600 font-black text-sm hover:underline">View Items</button>
                            </div>
                        </div>

                        <button onClick={confirmReceipt} className="w-full bg-gray-900 text-white py-5 rounded-[2rem] font-black text-lg shadow-2xl hover:bg-black transition-all">
                            I HAVE RECEIVED MY ORDER
                        </button>
                    </div>
                </div>
            </main>

            {/* Items Modal */}
            {showItems && (
                <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-black text-gray-800 uppercase tracking-tighter">Your Order Details</h3>
                            <button onClick={() => setShowItems(false)} className="text-gray-300 hover:text-black text-2xl">&times;</button>
                        </div>
                        <div className="space-y-4 max-h-80 overflow-y-auto no-scrollbar pr-2">
                            {purchasedItems.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                                    <img src={item.img} className="w-12 h-12 rounded-xl object-cover shadow-sm" alt={item.name}/>
                                    <div className="flex-1">
                                        <p className="font-bold text-gray-800 text-sm leading-tight">{item.name}</p>
                                        <p className="text-green-600 font-black text-xs">₹{item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setShowItems(false)} className="w-full mt-8 bg-gray-100 text-gray-500 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em]">Close Details</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tracking;