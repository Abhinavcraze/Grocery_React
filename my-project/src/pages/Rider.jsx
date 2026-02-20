import React, { useState } from 'react';
import '../styles/Deliverier.css';

const Rider = () => {
    // --- State Management ---
    const [view, setView] = useState('home'); // home, analytics, wallet
    const [deliveryState, setDeliveryState] = useState('idle'); // idle, request, active
    const [balance, setBalance] = useState(1420);
    const [showAIProgress, setShowAIProgress] = useState(false);
    const [viewTitle, setViewTitle] = useState('Elite Fleet');

    // --- Original JavaScript Logic Implementation ---
    const handleSwitchView = (newView) => {
        setView(newView);
        const titles = { 
            home: 'Command Center', 
            analytics: 'Achievements', 
            wallet: 'Rider Wallet' 
        };
        setViewTitle(titles[newView] || 'Elite Fleet');
    };

    const simulateRequest = () => setDeliveryState('request');
    const resetToIdle = () => setDeliveryState('idle');
    const acceptOrder = () => setDeliveryState('active');

    const startNavigation = () => {
        alert("GPS Connected: Optimal route via Sector 7 found. Note: Don't ring bell.");
        setShowAIProgress(true);
    };

    const completeOrder = () => {
        const confirmed = window.confirm("Confirm Delivery: Items checked & customer satisfied?");
        if (confirmed) {
            alert("SUCCESS! ₹115.00 Earned. \nBadge Progress: 'Speed Demon' 80% Complete!");
            setBalance(prev => prev + 115);
            // In a real app we'd update state; original code used location.reload()
            setDeliveryState('idle');
            setShowAIProgress(false);
            setView('home');
        }
    };

    const triggerSOS = () => {
        const check = window.confirm("EMERGENCY: Broadcast location to Dark Stores & Police?");
        if (check) alert("SOS Signal Sent. Support is tracking your live coordinates.");
    };

    return (
        <div className="h-screen flex flex-col relative bg-[#020617] text-white overflow-hidden font-['Outfit']">
            {/* Map Background Layer */}
            <div className="map-bg"></div>

            {/* --- HEADER --- */}
            <header className="relative z-50 p-6 flex justify-between items-center bg-slate-950/60 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="relative cursor-pointer active:scale-90 transition-transform">
                        <img src="https://i.pravatar.cc/100?u=rider1" className="w-12 h-12 rounded-2xl border-2 border-green-500 shadow-lg" alt="Profile" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-950"></div>
                    </div>
                    <div>
                        <h1 id="view-title" className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 mb-1">{viewTitle}</h1>
                        <p className="text-sm font-bold">Arul Kumar</p>
                    </div>
                </div>
                <div className="text-right glass px-4 py-2 rounded-2xl border-green-500/20">
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Earnings</p>
                    <p id="main-balance" className="text-lg font-black text-white">₹{balance}</p>
                </div>
            </header>

            <main className="relative z-10 flex-1 px-4 pt-6 overflow-hidden">

                {/* --- 1. HOME VIEW --- */}
                {view === 'home' && (
                    <div id="home-view" className="view-section active space-y-6 no-scrollbar">
                        {/* Reputation Row */}
                        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                            <div className="glass p-3 rounded-2xl flex items-center gap-3 min-w-[140px] border-l-4 border-yellow-500">
                                <img src="https://cdn-icons-png.flaticon.com/512/1162/1162456.png" className="w-8 h-8 badge-glow" alt="Speed" />
                                <div><p className="text-[8px] font-black text-slate-400 uppercase">Speed</p><p className="text-xs font-bold">Lightning</p></div>
                            </div>
                            <div className="glass p-3 rounded-2xl flex items-center gap-3 min-w-[140px] border-l-4 border-blue-500">
                                <img src="https://cdn-icons-png.flaticon.com/512/3112/3112946.png" className="w-8 h-8 opacity-40 grayscale" alt="Safety" />
                                <div><p className="text-[8px] font-black text-slate-400 uppercase">Safety</p><p className="text-xs font-bold text-slate-500">Locked</p></div>
                            </div>
                            <div className="glass p-3 rounded-2xl flex items-center gap-3 min-w-[140px] border-l-4 border-green-500">
                                <i className="fa-solid fa-medal text-green-500 text-xl"></i>
                                <div><p className="text-[8px] font-black text-slate-400 uppercase">Rating</p><p className="text-xs font-bold">4.9 Star</p></div>
                            </div>
                        </div>

                        {/* IDLE STATE */}
                        {deliveryState === 'idle' && (
                            <div id="state-idle" className="py-12 flex flex-col items-center space-y-8">
                                <div className="relative w-32 h-32 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-green-500/20 rounded-full pulse-radar"></div>
                                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl shadow-xl neon-green">
                                        <i className="fa-solid fa-crosshairs"></i>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-lg font-black tracking-tight uppercase italic animate-pulse">Scanning orders...</p>
                                    <button onClick={simulateRequest} className="mt-4 bg-white/5 text-slate-500 text-[9px] font-black px-6 py-2 rounded-full border border-white/10 uppercase hover:bg-white/10 transition-all">Incoming Demo</button>
                                </div>
                            </div>
                        )}

                        {/* REQUEST STATE */}
                        {deliveryState === 'request' && (
                            <div id="state-request" className="glass p-8 rounded-[3rem] shadow-2xl border-t-4 border-blue-500 animate-in zoom-in">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase">Sub-10m Delivery</span>
                                    <span className="text-xs font-bold text-slate-400">1.2 km • ₹115.00</span>
                                </div>
                                <h3 className="text-2xl font-black mb-1 italic">Flash Request</h3>
                                <p className="text-sm text-slate-400 mb-6 font-medium"><i className="fa-solid fa-store mr-1"></i> Pazhamuthir Dark Store #02</p>
                                <div className="flex gap-3">
                                    <button onClick={resetToIdle} className="flex-1 bg-slate-800 text-slate-400 py-4 rounded-2xl font-black text-xs uppercase">Decline</button>
                                    <button onClick={acceptOrder} className="flex-1 bg-green-500 text-black py-4 rounded-2xl font-black text-xs uppercase neon-green">Accept & Earn</button>
                                </div>
                            </div>
                        )}

                        {/* ACTIVE DELIVERY STATE */}
                        {deliveryState === 'active' && (
                            <div id="state-active" className="space-y-4 animate-in slide-in-from-right">
                                <div className="bg-white p-8 rounded-[3rem] text-slate-950 shadow-2xl relative overflow-hidden">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-2xl"><i className="fa-solid fa-motorcycle"></i></div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</p>
                                            <h4 className="text-xl font-black leading-none">Abhinav Baskaran</h4>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-2 mb-6">
                                        <span className="bg-orange-100 text-orange-600 text-[9px] font-black px-3 py-1 rounded-lg border border-orange-200"><i className="fa-solid fa-star"></i> PREMIUM CUSTOMER</span>
                                        <span className="bg-red-100 text-red-600 text-[9px] font-black px-3 py-1 rounded-lg border border-red-200 uppercase">Fragile: Eggs inside</span>
                                    </div>

                                    <p className="text-sm font-bold flex items-center gap-2 mb-8 text-slate-600">
                                        <i className="fa-solid fa-location-dot text-red-500"></i> HSR Layout, Sector 7, Apt 402
                                    </p>

                                    <div className="flex gap-2">
                                        {!showAIProgress ? (
                                            <button onClick={startNavigation} className="flex-1 bg-blue-600 text-white py-5 rounded-[2.5rem] font-black text-xs uppercase shadow-xl flex items-center justify-center gap-3">
                                                <i className="fa-solid fa-map-location-dot text-lg"></i> Navigate
                                            </button>
                                        ) : (
                                            <div className="flex-1 text-center py-5 text-blue-600 font-black text-xs uppercase italic">Navigating to customer...</div>
                                        )}
                                        <button className="bg-slate-100 p-5 rounded-full text-slate-400 active:text-green-600">
                                            <i className="fa-solid fa-phone"></i>
                                        </button>
                                    </div>
                                </div>

                                {showAIProgress && (
                                    <div id="pof-section" className="glass p-8 rounded-[3rem] border-2 border-dashed border-blue-500/30">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-8 h-8 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center"><i className="fa-solid fa-camera"></i></div>
                                            <h4 className="font-black text-sm uppercase italic">AI Freshness Audit</h4>
                                        </div>
                                        <div className="bg-slate-900 rounded-3xl p-10 text-center border border-white/5">
                                            <i className="fa-solid fa-circle-notch text-3xl text-blue-500 animate-spin mb-4 block"></i>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">Scanning items for damage... <br />Quality check in progress</p>
                                        </div>
                                        <button onClick={completeOrder} className="w-full bg-green-500 text-black py-5 rounded-[2.5rem] font-black text-sm uppercase mt-6 shadow-xl neon-green transition-transform active:scale-95">
                                            Delivered Successfully
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* --- 2. ANALYTICS VIEW --- */}
                {view === 'analytics' && (
                    <div id="analytics-view" className="view-section active space-y-6 no-scrollbar animate-in slide-in-from-bottom">
                        <div className="glass p-8 rounded-[3rem]">
                            <h3 className="font-black text-lg mb-6 flex justify-between items-center">RIDER BADGES <span className="text-[10px] text-green-500">3 UNLOCKED</span></h3>
                            <div className="grid grid-cols-4 gap-4">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-14 h-14 bg-yellow-500/20 rounded-full flex items-center justify-center border border-yellow-500/50 badge-glow">
                                        <img src="https://cdn-icons-png.flaticon.com/512/1162/1162456.png" className="w-8 h-8" alt="Badge" />
                                    </div>
                                    <span className="text-[8px] font-black text-center text-yellow-500 uppercase">Speed<br />Demon</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/50">
                                        <img src="https://cdn-icons-png.flaticon.com/512/3112/3112946.png" className="w-8 h-8" alt="Badge" />
                                    </div>
                                    <span className="text-[8px] font-black text-center text-blue-500 uppercase">Care<br />Taker</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 opacity-30">
                                    <div className="w-14 h-14 bg-slate-700 rounded-full flex items-center justify-center border border-slate-600 grayscale">
                                        <i className="fa-solid fa-clock-rotate-left text-xl text-slate-400"></i>
                                    </div>
                                    <span className="text-[8px] font-black text-center text-slate-500 uppercase">Night<br />Owl</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 opacity-30">
                                    <div className="w-14 h-14 bg-slate-700 rounded-full flex items-center justify-center border border-slate-600 grayscale">
                                        <i className="fa-solid fa-shield text-xl text-slate-400"></i>
                                    </div>
                                    <span className="text-[8px] font-black text-center text-slate-500 uppercase">Safety<br />Pro</span>
                                </div>
                            </div>
                        </div>

                        <div className="glass p-6 rounded-[3rem]">
                            <p className="text-[10px] font-black text-slate-500 uppercase mb-4 tracking-widest">Earnings History</p>
                            <div className="flex items-end h-32 gap-3 mb-4 px-2">
                                <div className="bg-slate-800 w-full h-[30%] rounded-lg"></div>
                                <div className="bg-slate-800 w-full h-[45%] rounded-lg"></div>
                                <div className="bg-slate-800 w-full h-[65%] rounded-lg"></div>
                                <div className="bg-green-500 w-full h-[90%] rounded-lg neon-green"></div>
                                <div className="bg-slate-800 w-full h-[55%] rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- 3. WALLET VIEW --- */}
                {view === 'wallet' && (
                    <div id="wallet-view" className="view-section active flex flex-col justify-center px-4 animate-in zoom-in">
                        <div className="text-center glass p-10 rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden">
                            <i className="fa-solid fa-wallet absolute -top-5 -right-5 text-[10rem] opacity-5 -rotate-12"></i>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Available Funds</p>
                            <h2 className="text-6xl font-black italic mb-10 tracking-tighter">₹{balance}<span className="text-lg font-normal text-slate-500">.00</span></h2>
                            <button className="w-full bg-green-500 text-black py-5 rounded-[2.5rem] font-black text-lg shadow-xl active:scale-95 transition-transform uppercase">
                                Transfer to Bank
                            </button>
                        </div>
                    </div>
                )}

            </main>

            {/* --- BOTTOM NAVIGATION --- */}
            <nav className="fixed bottom-0 w-full glass rounded-t-[3.5rem] px-10 py-8 border-t border-white/10 flex justify-between items-center z-[100] shadow-[0_-15px_40px_rgba(0,0,0,0.6)]">
                <div onClick={() => handleSwitchView('home')} className={`nav-btn transition-all cursor-pointer ${view === 'home' ? 'text-green-500 scale-110' : 'text-slate-600'}`}>
                    <i className="fa-solid fa-house-user text-2xl"></i>
                </div>
                <div onClick={() => handleSwitchView('analytics')} className={`nav-btn transition-all cursor-pointer ${view === 'analytics' ? 'text-green-500 scale-110' : 'text-slate-600'}`}>
                    <i className="fa-solid fa-medal text-2xl"></i>
                </div>
                
                {/* Center Action (SOS) */}
                <div onClick={triggerSOS} className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center shadow-lg shadow-red-500/40 -mt-20 border-4 border-slate-950 active:scale-90 transition-transform cursor-pointer">
                    <i className="fa-solid fa-triangle-exclamation text-white text-2xl"></i>
                </div>

                <div onClick={() => handleSwitchView('wallet')} className={`nav-btn transition-all cursor-pointer ${view === 'wallet' ? 'text-green-500 scale-110' : 'text-slate-600'}`}>
                    <i className="fa-solid fa-wallet text-2xl"></i>
                </div>
                <div onClick={() => alert('Battery: 92% • Vehicle Temp: Optimal')} className="nav-btn text-slate-600 transition-all cursor-pointer">
                    <i className="fa-solid fa-bolt-lightning text-2xl"></i>
                </div>
            </nav>
        </div>
    );
};

export default Rider;