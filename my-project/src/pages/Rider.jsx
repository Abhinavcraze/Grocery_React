import React, { useState } from 'react';
import '../styles/Deliverier.css';

// --- DATA CONSTANTS ---
const RIDERS = [
    { id: 1, name: "Arul Kumar", avatar: "https://i.pravatar.cc/150?u=rider1", level: "Elite", rating: 4.9, earnings: 1420 },
    { id: 2, name: "Priya Das", avatar: "https://i.pravatar.cc/150?u=rider2", level: "Gold", rating: 4.8, earnings: 950 },
    { id: 3, name: "Sanjay Singh", avatar: "https://i.pravatar.cc/150?u=rider3", level: "Pro", rating: 4.7, earnings: 2100 }
];

const ACTIVE_ORDER = {
    id: "PF-88323-AUDIT",
    customer: {
        name: "Abhinav Baskaran",
        phone: "+91 8778948004",
        address: "HSR Layout, Sector 7, Apt 402",
        coords: "12.9141,77.6412", // Real coordinates for HSR Layout Bangalore
        instructions: "Gate Code: 5521. Don't ring the bell.",
        tags: ["Premium", "Fragile: Eggs"],
        distance: "1.2 km"
    },
    items: [
        { name: "Alphonso Mango", qty: "2 Units", category: "Fresh Produce" },
        { name: "Pure Cow Milk", qty: "2L", category: "Dairy" },
        { name: "Brown Eggs", qty: "12 Units", category: "Eggs" }
    ],
    payout: { base: 60, distance: 25, tip: 30, total: 115 }
};

const Rider = () => {
    // --- State Management ---
    const [currentRider, setCurrentRider] = useState(RIDERS[0]);
    const [view, setView] = useState('home'); 
    const [deliveryState, setDeliveryState] = useState('idle'); // idle, request, navigating, checklist, success
    const [dutyOnline, setDutyOnline] = useState(true);
    const [mapMode, setMapMode] = useState('standard'); // standard, routing
    const [viewTitle, setViewTitle] = useState('Command Center');

    // --- Business Logic ---
    const handleSwitchRider = () => {
        const nextIdx = (RIDERS.findIndex(r => r.id === currentRider.id) + 1) % RIDERS.length;
        setCurrentRider(RIDERS[nextIdx]);
    };

    const handleSwitchView = (newView) => {
        setView(newView);
        const titles = { home: 'Command Center', analytics: 'Achievements', wallet: 'Rider Wallet' };
        setViewTitle(titles[newView] || 'Elite Fleet');
    };

    const handleAccept = () => setDeliveryState('navigating');
    const handleReachedStore = () => setDeliveryState('checklist');
    
    const handleGetDirections = () => {
        setMapMode('routing');
        const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${ACTIVE_ORDER.customer.coords}`;
        
        // High-class UI feedback
        alert("Connecting to external GPS...");
        setTimeout(() => {
            window.open(mapUrl, '_blank');
        }, 1000);
    };

    const handleComplete = () => {
        setCurrentRider(prev => ({ ...prev, earnings: prev.earnings + ACTIVE_ORDER.payout.total }));
        setDeliveryState('success');
        setMapMode('standard');
    };

    const triggerSOS = () => {
        if (window.confirm("EMERGENCY: Broadcast location to Dark Stores & Police?")) {
            alert("SOS Signal Sent. Support is tracking your live coordinates.");
        }
    };

    return (
        <div className="h-screen flex flex-col relative bg-[#020617] text-white overflow-hidden font-['Outfit']">
            <div className="map-bg"></div>

            {/* --- HEADER --- */}
            <header className="relative z-50 p-6 flex justify-between items-center bg-slate-950/60 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div onClick={handleSwitchRider} className="relative cursor-pointer active:scale-90 transition-transform group">
                        <img src={currentRider.avatar} className="w-12 h-12 rounded-2xl border-2 border-green-500 shadow-lg" alt="Profile" />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-950 ${dutyOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    </div>
                    <div>
                        <h1 className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 mb-1">
                            {view === 'home' ? `${currentRider.level} Fleet` : viewTitle}
                        </h1>
                        <p className="text-sm font-bold">{currentRider.name}</p>
                    </div>
                </div>
                <div className="text-right glass px-4 py-2 rounded-2xl border-green-500/20">
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest text-white/60">Earnings</p>
                    <p id="main-balance" className="text-lg font-black text-white">₹{currentRider.earnings}</p>
                </div>
            </header>

            <main className="relative z-10 flex-1 overflow-y-auto no-scrollbar pb-32">

                {/* --- 1. HOME VIEW --- */}
                {view === 'home' && (
                    <div className="animate-in fade-in duration-500">
                        
                        {/* Status Toggle Bar */}
                        <div className="px-4 mt-6">
                            <div className="glass p-4 rounded-3xl flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${dutyOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                                    <span className="text-[10px] font-black uppercase">{dutyOnline ? 'Active on Duty' : 'Offline'}</span>
                                </div>
                                <button onClick={() => setDutyOnline(!dutyOnline)} className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all ${dutyOnline ? 'bg-white/5 text-slate-400' : 'bg-green-600 text-white'}`}>
                                    {dutyOnline ? 'Break Time' : 'Go Online'}
                                </button>
                            </div>
                        </div>

                        {/* IDLE STATE */}
                        {deliveryState === 'idle' && dutyOnline && (
                            <div className="py-20 flex flex-col items-center space-y-8">
                                <div className="relative w-32 h-32 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-green-500/20 rounded-full pulse-radar"></div>
                                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center shadow-xl neon-green">
                                        <i className="fa-solid fa-crosshairs text-xl"></i>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-lg font-black italic animate-pulse text-white/80">Scanning orders...</p>
                                    <button onClick={() => setDeliveryState('request')} className="mt-4 bg-white/5 text-slate-500 text-[10px] font-black px-6 py-2 rounded-full border border-white/10 uppercase">Launch Demo</button>
                                </div>
                            </div>
                        )}

                        {/* REQUEST STATE */}
                        {deliveryState === 'request' && (
                            <div className="px-4 mt-6">
                                <div className="glass p-8 rounded-[3rem] shadow-2xl border-t-4 border-blue-500 animate-in zoom-in">
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase italic">Priority</span>
                                        <span className="text-xs font-bold text-slate-400 italic">{ACTIVE_ORDER.customer.distance} • ₹{ACTIVE_ORDER.payout.total}</span>
                                    </div>
                                    <h3 className="text-2xl font-black mb-1 italic">Order Incoming</h3>
                                    <p className="text-sm text-slate-400 mb-6 font-medium">From Dark Store #02 → {ACTIVE_ORDER.customer.address}</p>
                                    
                                    <div className="grid grid-cols-2 gap-2 mb-6 border-y border-white/5 py-4">
                                        <div><p className="text-[8px] text-slate-500 uppercase font-black">Base Pay</p><p className="text-xs font-bold">₹{ACTIVE_ORDER.payout.base}</p></div>
                                        <div><p className="text-[8px] text-slate-500 uppercase font-black">Incl. Tip</p><p className="text-xs font-bold text-green-500">₹{ACTIVE_ORDER.payout.tip}</p></div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button onClick={() => setDeliveryState('idle')} className="flex-1 bg-slate-800 text-slate-400 py-4 rounded-2xl font-black text-xs uppercase transition-all active:scale-95">Pass</button>
                                        <button onClick={handleAccept} className="flex-1 bg-green-500 text-black py-4 rounded-2xl font-black text-xs uppercase neon-green transition-all active:scale-95">Accept Order</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ACTIVE DELIVERY PHASE */}
                        {(deliveryState === 'navigating' || deliveryState === 'checklist') && (
                            <div className="space-y-4 animate-in slide-in-from-right">
                                {/* DYNAMIC INTERACTIVE MAP */}
                                <div className="relative w-full h-80 bg-slate-900 border-b border-white/5 overflow-hidden">
                                    <div className={`absolute inset-0 bg-cover opacity-60 transition-all duration-1000 ${mapMode === 'routing' ? 'scale-110' : 'scale-100'}`} 
                                         style={{ backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-s+ff0000(${ACTIVE_ORDER.customer.coords})/77.64,12.91,13/600x400?access_token=YOUR_TOKEN')` }}>
                                    </div>
                                    
                                    {/* Simulated Route Line */}
                                    {mapMode === 'routing' && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="w-[200px] h-[2px] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,1)] rotate-45 animate-pulse"></div>
                                        </div>
                                    )}

                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-slate-950/90 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 flex items-center gap-4 shadow-2xl">
                                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{deliveryState === 'navigating' ? 'GPS: Routing to Customer' : 'Arrived at Store'}</span>
                                        </div>
                                    </div>

                                    {/* Floating Point Label */}
                                    <div className="absolute top-[40%] right-[30%] bg-red-600 px-3 py-1 rounded shadow-xl border border-white/20">
                                        <p className="text-[8px] font-black uppercase tracking-widest text-white">Target</p>
                                    </div>
                                </div>

                                <div className="px-4 -mt-12 relative z-20">
                                    {/* Customer Insight Card */}
                                    <div className="bg-white p-6 rounded-[2.5rem] text-slate-950 shadow-2xl mb-4 border border-white/20">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-2xl shadow-inner"><i className="fa-solid fa-user-check"></i></div>
                                                <div>
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Customer</p>
                                                    <h4 className="text-xl font-black">{ACTIVE_ORDER.customer.name}</h4>
                                                </div>
                                            </div>
                                            <a href={`tel:${ACTIVE_ORDER.customer.phone}`} className="bg-slate-900 p-5 rounded-full text-green-500 active:scale-90 transition-transform shadow-lg"><i className="fa-solid fa-phone"></i></a>
                                        </div>
                                        
                                        <div className="space-y-3 bg-slate-50 p-4 rounded-3xl border border-slate-100 mb-6 shadow-sm">
                                            <p className="text-sm font-bold text-slate-800"><i className="fa-solid fa-location-dot text-red-500 mr-2"></i>{ACTIVE_ORDER.customer.address}</p>
                                            <div className="flex gap-2">
                                                {ACTIVE_ORDER.customer.tags.map(tag => (
                                                    <span key={tag} className="text-[8px] font-black text-orange-600 border border-orange-100 px-2 py-0.5 rounded uppercase italic">{tag}</span>
                                                ))}
                                            </div>
                                            <p className="text-[10px] text-slate-500 italic bg-white p-3 rounded-xl border border-slate-100 leading-relaxed">
                                                <i className="fa-solid fa-quote-left mr-2 opacity-20"></i>{ACTIVE_ORDER.customer.instructions}
                                            </p>
                                        </div>

                                        <div className="flex gap-3">
                                            <button onClick={handleGetDirections} className="flex-1 bg-blue-600 text-white py-5 rounded-[2.5rem] font-black text-xs uppercase shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all">
                                                <i className="fa-solid fa-diamond-turn-right text-lg"></i> Get Directions
                                            </button>
                                        </div>
                                    </div>

                                    {/* Professional Manifest Checklist */}
                                    {deliveryState === 'checklist' && (
                                        <div className="glass p-6 rounded-[3.5rem] border border-white/10 animate-in slide-in-from-bottom shadow-2xl">
                                            <div className="flex justify-between items-center mb-6 px-2">
                                                <h4 className="text-xs font-black text-green-500 uppercase tracking-widest">Order Manifest</h4>
                                                <span className="text-[8px] font-bold text-slate-500">{ACTIVE_ORDER.id}</span>
                                            </div>
                                            <div className="space-y-4">
                                                {ACTIVE_ORDER.items.map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-4 bg-white/5 p-4 rounded-[2rem] border border-white/5 group hover:border-green-500/30 transition-all">
                                                        <input type="checkbox" className="w-6 h-6 accent-green-500 rounded-full border-white/10 bg-transparent cursor-pointer" />
                                                        <div className="flex-1">
                                                            <p className="text-xs font-bold text-white/90">{item.name}</p>
                                                            <p className="text-[9px] text-slate-500 uppercase font-black">{item.qty} • {item.category}</p>
                                                        </div>
                                                        <i className="fa-solid fa-circle-check text-slate-800 group-has-[:checked]:text-green-500 transition-colors"></i>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* SUCCESS STATE */}
                        {deliveryState === 'success' && (
                            <div className="py-24 px-4 text-center animate-in zoom-in">
                                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(34,197,94,0.4)]">
                                    <i className="fa-solid fa-check text-5xl text-black"></i>
                                </div>
                                <h3 className="text-3xl font-black italic mb-2 tracking-tight">Well Done!</h3>
                                <p className="text-slate-400 text-sm mb-12 max-w-[200px] mx-auto">₹{ACTIVE_ORDER.payout.total} has been credited to your Rider Wallet.</p>
                                <button onClick={() => setDeliveryState('idle')} className="bg-white/10 px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">Back to Center</button>
                            </div>
                        )}
                    </div>
                )}

                {/* --- 2. ANALYTICS & WALLET VIEWS (Maintained design) --- */}
                {view === 'analytics' && (
                    <div className="p-4 space-y-6 animate-in slide-in-from-bottom">
                        <div className="glass p-8 rounded-[3rem]">
                            <h3 className="font-black text-xl mb-8 flex justify-between items-center text-green-500">Service DNA <i className="fa-solid fa-medal"></i></h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-[10px] font-black uppercase mb-2 text-slate-400"><span>Safety Rating</span><span className="text-green-500">9.2/10</span></div>
                                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden"><div className="w-[92%] h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div></div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[10px] font-black uppercase mb-2 text-slate-400"><span>Blitz Speed</span><span className="text-yellow-500">8.8/10</span></div>
                                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden"><div className="w-[88%] h-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {view === 'wallet' && (
                    <div className="p-4 flex flex-col justify-center h-[70vh] animate-in zoom-in">
                        <div className="text-center glass p-12 rounded-[4rem] relative overflow-hidden border border-white/5 shadow-2xl">
                            <i className="fa-solid fa-wallet absolute -top-5 -right-5 text-[15rem] opacity-5 -rotate-12"></i>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-6">Cashout Ready</p>
                            <h2 className="text-7xl font-black italic mb-12 tracking-tighter">₹{currentRider.earnings}</h2>
                            <button className="w-full bg-green-500 text-black py-6 rounded-[2.5rem] font-black text-xl shadow-[0_20px_40px_rgba(34,197,94,0.3)] uppercase active:scale-95 transition-all">Instant Transfer</button>
                        </div>
                    </div>
                )}
            </main>

            {/* --- ACTION FLOATING PANEL --- */}
            {(deliveryState === 'navigating' || deliveryState === 'checklist') && (
                <div className="fixed bottom-28 left-0 w-full px-6 z-[100] animate-in slide-in-from-bottom">
                    {deliveryState === 'navigating' ? (
                        <button onClick={handleReachedStore} className="w-full bg-green-600 py-5 rounded-[2.5rem] font-black text-sm uppercase shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-transform active:scale-95 flex items-center justify-center gap-3">
                             Confirm Picked Up <i className="fa-solid fa-box-open text-lg"></i>
                        </button>
                    ) : (
                        <button onClick={handleComplete} className="w-full bg-blue-600 py-5 rounded-[2.5rem] font-black text-sm uppercase shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-transform active:scale-95 flex items-center justify-center gap-3">
                            Finish Delivery <i className="fa-solid fa-check-double text-lg"></i>
                        </button>
                    )}
                </div>
            )}

            {/* --- BOTTOM NAVIGATION BAR --- */}
            <nav className="fixed bottom-0 w-full glass rounded-t-[4rem] px-12 py-10 border-t border-white/10 flex justify-between items-center z-[110] shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
                <div onClick={() => handleSwitchView('home')} className={`nav-btn cursor-pointer transition-all ${view === 'home' ? 'text-green-500 scale-125' : 'text-slate-700 hover:text-slate-400'}`}><i className="fa-solid fa-house-user text-2xl"></i></div>
                <div onClick={() => handleSwitchView('analytics')} className={`nav-btn cursor-pointer transition-all ${view === 'analytics' ? 'text-green-500 scale-125' : 'text-slate-700 hover:text-slate-400'}`}><i className="fa-solid fa-medal text-2xl"></i></div>
                
                {/* SOS Button */}
                <div onClick={triggerSOS} className="bg-red-600 w-20 h-20 rounded-full flex items-center justify-center shadow-[0_15px_35px_rgba(220,38,38,0.5)] -mt-24 border-8 border-slate-950 active:scale-90 transition-transform cursor-pointer">
                    <i className="fa-solid fa-triangle-exclamation text-white text-3xl"></i>
                </div>

                <div onClick={() => handleSwitchView('wallet')} className={`nav-btn cursor-pointer transition-all ${view === 'wallet' ? 'text-green-500 scale-125' : 'text-slate-700 hover:text-slate-400'}`}><i className="fa-solid fa-wallet text-2xl"></i></div>
                <div onClick={() => alert('Vehicle Health: Optimal | Battery: 92%')} className="nav-btn text-slate-700 transition-all cursor-pointer hover:text-slate-400">
                    <i className="fa-solid fa-bolt-lightning text-2xl"></i>
                </div>
            </nav>
        </div>
    );
};

export default Rider;