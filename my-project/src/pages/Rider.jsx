import React, { useState } from 'react';
import '../styles/Deliverier.css';

const Rider = () => {
    const [view, setView] = useState('home');
    const [status, setStatus] = useState('idle'); // idle, request, active
    const [balance, setBalance] = useState(1420);
    const [showPof, setShowPof] = useState(false);

    const handleAccept = () => setStatus('active');
    
    const handleComplete = () => {
        if (window.confirm("Confirm Delivery: Items checked & customer satisfied?")) {
            setBalance(prev => prev + 115);
            setStatus('idle');
            setShowPof(false);
            alert("SUCCESS! ₹115.00 Earned.");
        }
    };

    const triggerSOS = () => {
        if(window.confirm("EMERGENCY: Broadcast location to Dark Stores & Police?")) {
            alert("SOS Signal Sent. Support is tracking your live coordinates.");
        }
    };

    return (
        <div className="h-screen flex flex-col relative bg-[#020617] text-white overflow-hidden font-['Outfit']">
            <div className="map-bg"></div>
            
            <header className="relative z-50 p-6 flex justify-between items-center bg-slate-950/60 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center gap-4">
                    <img src="https://i.pravatar.cc/100?u=rider1" className="w-12 h-12 rounded-2xl border-2 border-green-500" alt="avatar"/>
                    <div>
                        <h1 className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 mb-1">Elite Fleet</h1>
                        <p className="text-sm font-bold">Arul Kumar</p>
                    </div>
                </div>
                <div className="text-right glass px-4 py-2 rounded-2xl border-green-500/20">
                    <p className="text-[8px] text-slate-400 font-bold uppercase">Earnings</p>
                    <p className="text-lg font-black">₹{balance}</p>
                </div>
            </header>

            <main className="relative z-10 flex-1 px-4 pt-6 overflow-hidden">
                {view === 'home' && (
                    <div className="view-section active space-y-6">
                        {status === 'idle' && (
                            <div className="py-12 flex flex-col items-center space-y-8">
                                <div className="relative w-32 h-32 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-green-500/20 rounded-full pulse-radar"></div>
                                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center shadow-xl neon-green">
                                        <i className="fa-solid fa-crosshairs"></i>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-lg font-black italic animate-pulse">Scanning orders...</p>
                                    <button onClick={() => setStatus('request')} className="mt-4 bg-white/5 text-slate-500 text-[9px] font-black px-6 py-2 rounded-full border border-white/10 uppercase">Incoming Demo</button>
                                </div>
                            </div>
                        )}

                        {status === 'request' && (
                            <div className="glass p-8 rounded-[3rem] shadow-2xl border-t-4 border-blue-500">
                                <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase">Sub-10m Delivery</span>
                                <h3 className="text-2xl font-black mt-4 italic">Flash Request</h3>
                                <p className="text-sm text-slate-400 mb-6 font-medium"><i className="fa-solid fa-store mr-1"></i> Pazhamuthir Dark Store #02</p>
                                <div className="flex gap-3">
                                    <button onClick={() => setStatus('idle')} className="flex-1 bg-slate-800 text-slate-400 py-4 rounded-2xl font-black text-xs uppercase">Decline</button>
                                    <button onClick={handleAccept} className="flex-1 bg-green-500 text-black py-4 rounded-2xl font-black text-xs uppercase neon-green">Accept & Earn</button>
                                </div>
                            </div>
                        )}

                        {status === 'active' && (
                             <div className="space-y-4">
                                <div className="bg-white p-8 rounded-[3rem] text-slate-950 shadow-2xl">
                                    <h4 className="text-xl font-black">Abhinav Baskaran</h4>
                                    <p className="text-sm font-bold mt-4 text-slate-600"><i className="fa-solid fa-location-dot text-red-500"></i> HSR Layout, Sector 7, Apt 402</p>
                                    {!showPof && (
                                        <button onClick={() => setShowPof(true)} className="w-full bg-blue-600 text-white py-5 rounded-[2.5rem] font-black text-xs uppercase mt-6 shadow-xl">Navigate</button>
                                    )}
                                </div>
                                {showPof && (
                                    <div className="glass p-8 rounded-[3rem] border-2 border-dashed border-blue-500/30">
                                        <button onClick={handleComplete} className="w-full bg-green-500 text-black py-5 rounded-[2.5rem] font-black text-sm uppercase shadow-xl neon-green">Delivered Successfully</button>
                                    </div>
                                )}
                             </div>
                        )}
                    </div>
                )}
            </main>

            <nav className="fixed bottom-0 w-full glass rounded-t-[3.5rem] px-10 py-8 border-t border-white/10 flex justify-between items-center z-[100]">
                <div onClick={() => setView('home')} className={`nav-btn ${view === 'home' ? 'text-green-500' : 'text-slate-600'}`}><i className="fa-solid fa-house-user text-2xl"></i></div>
                <div onClick={() => setView('analytics')} className={`nav-btn ${view === 'analytics' ? 'text-green-500' : 'text-slate-600'}`}><i className="fa-solid fa-medal text-2xl"></i></div>
                <div onClick={triggerSOS} className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center shadow-lg -mt-20 border-4 border-slate-950 active:scale-90"><i className="fa-solid fa-triangle-exclamation text-white text-2xl"></i></div>
                <div onClick={() => setView('wallet')} className={`nav-btn ${view === 'wallet' ? 'text-green-500' : 'text-slate-600'}`}><i className="fa-solid fa-wallet text-2xl"></i></div>
                <div onClick={() => alert('Battery: 92%')} className="text-slate-600"><i className="fa-solid fa-bolt-lightning text-2xl"></i></div>
            </nav>
        </div>
    );
};

export default Rider;