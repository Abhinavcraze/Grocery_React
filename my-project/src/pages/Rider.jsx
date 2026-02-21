import React, { useState, useEffect } from 'react';
import '../styles/Deliverier.css';

// --- DATA CONSTANTS ---
const INITIAL_RIDERS = [
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
        lat: 12.9141,
        lng: 77.6412,
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
    // --- 1. State Management ---
    const [riders, setRiders] = useState(() => {
        const saved = localStorage.getItem('rider_profiles');
        return saved ? JSON.parse(saved) : INITIAL_RIDERS;
    });

    const [currentRiderId, setCurrentRiderId] = useState(() => {
        return Number(localStorage.getItem('active_rider_id')) || 1;
    });

    const [view, setView] = useState('home'); // home, analytics, wallet
    const [deliveryState, setDeliveryState] = useState('idle'); // idle, request, navigating, checklist, success
    const [dutyOnline, setDutyOnline] = useState(true);
    const [mapMode, setMapMode] = useState('standard');
    const [checklist, setChecklist] = useState({});

    // Current profile helper
    const currentRider = riders.find(r => r.id === currentRiderId) || riders[0];

    // --- 2. Persistent Sync ---
    useEffect(() => {
        localStorage.setItem('rider_profiles', JSON.stringify(riders));
        localStorage.setItem('active_rider_id', currentRiderId.toString());
    }, [riders, currentRiderId]);

    // --- 3. Business Logic Functions ---
    
    // Switch between Arul, Priya, and Sanjay
    const handleSwitchRider = () => {
        const nextIdx = (riders.findIndex(r => r.id === currentRiderId) + 1) % riders.length;
        setCurrentRiderId(riders[nextIdx].id);
        setDeliveryState('idle'); 
    };

    // Navigation Logic
    const handleSwitchView = (newView) => {
        setView(newView);
    };

    const handleGetDirections = () => {
        setMapMode('routing');
        const url = `https://www.google.com/maps/dir/?api=1&destination=${ACTIVE_ORDER.customer.lat},${ACTIVE_ORDER.customer.lng}`;
        window.open(url, '_blank');
    };

    const toggleCheckItem = (index) => {
        setChecklist(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const handleComplete = () => {
        if (window.confirm("Confirm Delivery: All items verified?")) {
            const updatedRiders = riders.map(r => 
                r.id === currentRiderId 
                ? { ...r, earnings: r.earnings + ACTIVE_ORDER.payout.total } 
                : r
            );
            setRiders(updatedRiders);
            setDeliveryState('success');
            setMapMode('standard');
            setChecklist({});
        }
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
                            {view === 'home' ? `${currentRider.level} Fleet` : view.toUpperCase()}
                        </h1>
                        <p className="text-sm font-bold">{currentRider.name}</p>
                    </div>
                </div>
                <div className="text-right glass px-4 py-2 rounded-2xl border-green-500/20">
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Earnings</p>
                    <p id="main-balance" className="text-lg font-black text-white">₹{currentRider.earnings}</p>
                </div>
            </header>

            <main className="relative z-10 flex-1 overflow-y-auto no-scrollbar pb-32">

                {/* --- HOME VIEW --- */}
                {view === 'home' && (
                    <div className="animate-in fade-in duration-500">
                        {/* Status Bar */}
                        <div className="px-4 mt-6">
                            <div className="glass p-4 rounded-3xl flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${dutyOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                                    <span className="text-[10px] font-black uppercase">{dutyOnline ? 'Duty Online' : 'Offline'}</span>
                                </div>
                                <button onClick={() => setDutyOnline(!dutyOnline)} className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase ${dutyOnline ? 'bg-white/5 text-slate-400' : 'bg-green-600 text-white'}`}>
                                    {dutyOnline ? 'Go Offline' : 'Go Online'}
                                </button>
                            </div>
                        </div>

                        {/* IDLE */}
                        {deliveryState === 'idle' && dutyOnline && (
                            <div className="py-20 flex flex-col items-center space-y-8 text-center">
                                <div className="relative w-32 h-32 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-green-500/20 rounded-full pulse-radar"></div>
                                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white shadow-xl neon-green">
                                        <i className="fa-solid fa-crosshairs text-xl"></i>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-lg font-black italic animate-pulse text-white/80">Scanning orders...</p>
                                    <button onClick={() => setDeliveryState('request')} className="mt-4 bg-white/5 text-slate-500 text-[10px] font-black px-6 py-2 rounded-full border border-white/10 uppercase">Launch Demo</button>
                                </div>
                            </div>
                        )}

                        {/* REQUEST */}
                        {deliveryState === 'request' && (
                            <div className="px-4 mt-6">
                                <div className="glass p-8 rounded-[3rem] shadow-2xl border-t-4 border-blue-500 animate-in zoom-in">
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase">Priority Order</span>
                                        <span className="text-xs font-bold text-slate-400 italic">{ACTIVE_ORDER.customer.distance} • ₹{ACTIVE_ORDER.payout.total}</span>
                                    </div>
                                    <h3 className="text-2xl font-black mb-1 italic">Incoming Request</h3>
                                    <p className="text-sm text-slate-400 mb-6 font-medium">Dark Store #02 → {ACTIVE_ORDER.customer.address}</p>
                                    <div className="flex gap-3">
                                        <button onClick={() => setDeliveryState('idle')} className="flex-1 bg-slate-800 text-slate-400 py-4 rounded-2xl font-black text-xs uppercase active:scale-95">Decline</button>
                                        <button onClick={() => setDeliveryState('navigating')} className="flex-1 bg-green-500 text-black py-4 rounded-2xl font-black text-xs uppercase neon-green active:scale-95">Accept</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* NAVIGATING / CHECKLIST */}
                        {(deliveryState === 'navigating' || deliveryState === 'checklist') && (
                            <div className="space-y-4 animate-in slide-in-from-right">
                                <div className="relative w-full h-80 bg-slate-900 overflow-hidden">
                                    <div className={`absolute inset-0 bg-cover bg-center opacity-40 transition-all duration-1000 ${mapMode === 'routing' ? 'scale-110 blur-[1px]' : 'scale-100'}`} 
                                         style={{ backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-s+ff0000(${ACTIVE_ORDER.customer.lng},${ACTIVE_ORDER.customer.lat})/77.64,12.91,13/600x400?access_token=YOUR_TOKEN')` }}>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-slate-950/90 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 flex items-center gap-4 shadow-2xl">
                                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{deliveryState === 'navigating' ? 'Routing to Customer' : 'At Destination'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-4 -mt-12 relative z-20">
                                    <div className="bg-white p-6 rounded-[2.5rem] text-slate-950 shadow-2xl mb-4">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-xl"><i className="fa-solid fa-user"></i></div>
                                                <h4 className="text-lg font-black">{ACTIVE_ORDER.customer.name}</h4>
                                            </div>
                                            <a href={`tel:${ACTIVE_ORDER.customer.phone}`} className="bg-slate-900 p-4 rounded-full text-green-500 active:scale-90 shadow-lg"><i className="fa-solid fa-phone"></i></a>
                                        </div>
                                        <div className="space-y-3 bg-slate-50 p-4 rounded-3xl border border-slate-100 mb-6">
                                            <p className="text-xs font-bold text-slate-800"><i className="fa-solid fa-location-dot text-red-500 mr-2"></i>{ACTIVE_ORDER.customer.address}</p>
                                            <p className="text-[10px] text-slate-500 italic bg-white p-2 rounded-xl">"{ACTIVE_ORDER.customer.instructions}"</p>
                                        </div>
                                        <button onClick={handleGetDirections} className="w-full bg-blue-600 text-white py-5 rounded-[2.5rem] font-black text-xs uppercase shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all">
                                            <i className="fa-solid fa-diamond-turn-right text-lg"></i> Get Directions
                                        </button>
                                    </div>

                                    {deliveryState === 'checklist' && (
                                        <div className="glass p-6 rounded-[3.5rem] border border-white/10 shadow-2xl animate-in slide-in-from-bottom">
                                            <h4 className="text-xs font-black text-green-500 uppercase tracking-widest mb-6 px-2">Pickup Manifest</h4>
                                            <div className="space-y-4">
                                                {ACTIVE_ORDER.items.map((item, idx) => (
                                                    <div key={idx} onClick={() => toggleCheckItem(idx)} className="flex items-center gap-4 bg-white/5 p-4 rounded-[2rem] border border-white/5 cursor-pointer">
                                                        <input type="checkbox" checked={!!checklist[idx]} readOnly className="w-6 h-6 accent-green-500" />
                                                        <p className={`text-xs font-bold ${checklist[idx] ? 'line-through text-slate-500' : 'text-white'}`}>{item.name} • {item.qty}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {deliveryState === 'success' && (
                            <div className="py-24 px-4 text-center animate-in zoom-in">
                                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/40"><i className="fa-solid fa-check text-5xl text-black"></i></div>
                                <h3 className="text-3xl font-black italic">Success!</h3>
                                <p className="text-slate-400 text-sm mb-12">₹{ACTIVE_ORDER.payout.total} added to your account.</p>
                                <button onClick={() => setDeliveryState('idle')} className="bg-white/10 px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/20">Go Back</button>
                            </div>
                        )}
                    </div>
                )}

                {/* --- ANALYTICS VIEW --- */}
                {view === 'analytics' && (
                    <div className="p-4 animate-in slide-in-from-bottom">
                        <div className="glass p-8 rounded-[3rem]">
                            <h3 className="font-black text-xl mb-8 flex justify-between items-center text-green-500">Service Score <i className="fa-solid fa-medal"></i></h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-[10px] font-black uppercase mb-2 text-slate-400"><span>Safety</span><span className="text-green-500">9.2</span></div>
                                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden"><div className="w-[92%] h-full bg-green-500"></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- WALLET VIEW --- */}
                {view === 'wallet' && (
                    <div className="p-4 flex flex-col justify-center h-[70vh] animate-in zoom-in">
                        <div className="text-center glass p-12 rounded-[4rem] relative overflow-hidden border border-white/5 shadow-2xl">
                            <i className="fa-solid fa-wallet absolute -top-5 -right-5 text-[15rem] opacity-5 -rotate-12"></i>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-6">Wallet Balance</p>
                            <h2 className="text-7xl font-black italic mb-12">₹{currentRider.earnings}</h2>
                            <button onClick={() => alert("Withdrawal Sent!")} className="w-full bg-green-500 text-black py-6 rounded-[2.5rem] font-black text-xl shadow-xl uppercase active:scale-95 transition-all">Withdraw Now</button>
                        </div>
                    </div>
                )}
            </main>

            {/* --- ACTION BAR --- */}
            {(deliveryState === 'navigating' || deliveryState === 'checklist') && (
                <div className="fixed bottom-28 left-0 w-full px-6 z-[100] animate-in slide-in-from-bottom">
                    {deliveryState === 'navigating' ? (
                        <button onClick={() => setDeliveryState('checklist')} className="w-full bg-green-600 py-5 rounded-[2.5rem] font-black text-sm uppercase shadow-2xl active:scale-95">Confirm Pickup <i className="fa-solid fa-box-open ml-2"></i></button>
                    ) : (
                        <button 
                            disabled={Object.keys(checklist).length < ACTIVE_ORDER.items.length} 
                            onClick={handleComplete} 
                            className={`w-full py-5 rounded-[2.5rem] font-black text-sm uppercase shadow-2xl active:scale-95 transition-all ${Object.keys(checklist).length < ACTIVE_ORDER.items.length ? 'bg-slate-700 opacity-50' : 'bg-blue-600'}`}
                        >
                            Complete Delivery <i className="fa-solid fa-check-double ml-2"></i>
                        </button>
                    )}
                </div>
            )}

            {/* --- BOTTOM NAV --- */}
            <nav className="fixed bottom-0 w-full glass rounded-t-[4rem] px-12 py-10 border-t border-white/10 flex justify-between items-center z-[110] shadow-2xl">
                <div onClick={() => handleSwitchView('home')} className={`nav-btn cursor-pointer transition-all ${view === 'home' ? 'text-green-500 scale-125' : 'text-slate-700'}`}><i className="fa-solid fa-house-user text-2xl"></i></div>
                <div onClick={() => handleSwitchView('analytics')} className={`nav-btn cursor-pointer transition-all ${view === 'analytics' ? 'text-green-500 scale-125' : 'text-slate-700'}`}><i className="fa-solid fa-medal text-2xl"></i></div>
                <div onClick={triggerSOS} className="bg-red-600 w-20 h-20 rounded-full flex items-center justify-center shadow-red-500/40 -mt-24 border-8 border-slate-950 active:scale-90 cursor-pointer shadow-lg"><i className="fa-solid fa-triangle-exclamation text-white text-3xl"></i></div>
                <div onClick={() => handleSwitchView('wallet')} className={`nav-btn cursor-pointer transition-all ${view === 'wallet' ? 'text-green-500 scale-125' : 'text-slate-700'}`}><i className="fa-solid fa-wallet text-2xl"></i></div>
                <div onClick={() => alert('Vehicle Health: Optimal')} className="nav-btn text-slate-700 cursor-pointer"><i className="fa-solid fa-bolt-lightning text-2xl"></i></div>
            </nav>
        </div>
    );
};

export default Rider;