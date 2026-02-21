import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
    
    // State for Modal and Form
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        // Toggle body scroll like the original script
        document.body.style.overflow = !isModalOpen ? 'hidden' : 'auto';
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // Credentials from original validateLandingLogin logic
        const clientEmail = "abhinavbaskaran8303@gmail.com";
        const clientPassword = "Abhinav@8323";
        const riderEmail = "rider@pazhamuthir.com";
        const riderPassword = "Rider@123";

        if (email === clientEmail && password === clientPassword) {
            alert("Login Successful! Welcome to the Store.");
            navigate('/store');
            document.body.style.overflow = 'auto';
        } else if (email === riderEmail && password === riderPassword) {
            alert("Rider Authenticated! Opening Command Center.");
            navigate('/rider');
            document.body.style.overflow = 'auto';
        } else {
            alert("Access Denied: Invalid Email or Password. \n\nPlease check your credentials.");
        }
    };

    return (
        <div className="bg-white text-gray-900 font-['Outfit']">
            {/* Component-Specific Internal Styles */}
            <style>{`
                .hero-gradient { background: radial-gradient(circle at top right, #f0fdf4 0%, #ffffff 100%); }
                .feature-card:hover { transform: translateY(-10px); transition: all 0.4s ease; }
                .glass { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(10px); }
                .animate-float { animation: float 6s ease-in-out infinite; }
                @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }
            `}</style>

            {/* Header */}
            <header className="fixed top-0 w-full z-50 glass border-b border-gray-100">
                <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-green-600 p-2 rounded-xl text-white">
                            <i className="fa-solid fa-leaf text-xl"></i>
                        </div>
                        <h1 className="text-2xl font- black text-green-800 tracking-tighter">PAZHAMUTHIR</h1>
                    </div>
                    <div className="hidden md:flex gap-8 font-bold text-gray-600">
                        <a href="#features" className="hover:text-green-600">Features</a>
                        <a href="#why-us" className="hover:text-green-600">Why Us?</a>
                        <a href="#delivery" className="hover:text-green-600">Delivery Area</a>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={toggleModal} className="px-6 py-2.5 font-bold text-gray-700">Login</button>
                        <button onClick={() => navigate('/store')} className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-green-100 hover:bg-green-700 transition-all">
                            Order Now
                        </button>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 hero-gradient overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-widest">
                            🚀 10 Minute Delivery
                        </span>
                        <h2 className="text-6xl md:text-7xl font-black text-gray-900 leading-[1.1] mt-6">
                            Garden Fresh <br/><span className="text-green-600">Groceries</span> to <br/>Your Door.
                        </h2>
                        <p className="text-gray-500 text-lg mt-6 max-w-md">
                            Experience the convenience of farm-fresh produce and daily essentials delivered in under 12 minutes. Secure escrow payments included.
                        </p>
                        <div className="flex gap-4 mt-10">
                            <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-lg flex items-center gap-3 hover:bg-black transition-all">
                                Get Started <i className="fa-solid fa-arrow-right"></i>
                            </button>
                            <div className="flex items-center gap-3 px-4">
                                <div className="flex -space-x-3">
                                    <img src="https://i.pravatar.cc/100?u=1" className="w-10 h-10 rounded-full border-2 border-white" alt="user"/>
                                    <img src="https://i.pravatar.cc/100?u=2" className="w-10 h-10 rounded-full border-2 border-white" alt="user"/>
                                    <img src="https://i.pravatar.cc/100?u=3" className="w-10 h-10 rounded-full border-2 border-white" alt="user"/>
                                </div>
                                <p className="text-xs font-bold text-gray-400">Trusted by <br/><span className="text-gray-900 text-sm">2.4M Users</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800" className="rounded-[3rem] shadow-2xl animate-float relative z-10" alt="Hero"/>
                        <div className="absolute -bottom-10 -left-10 glass p-6 rounded-[2rem] shadow-xl z-20 border border-white">
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Latest Delivery</p>
                            <div className="flex items-center gap-3 mt-2">
                                <div className="bg-green-100 text-green-600 p-2 rounded-lg"><i className="fa-solid fa-bolt"></i></div>
                                <p className="font-black text-gray-800">8 Minutes 42 Seconds</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <div className="bg-gray-50 border-y border-gray-100 py-10">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <h3 className="text-4xl font-black text-gray-900 italic">5k+</h3>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Products</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-4xl font-black text-gray-900 italic">100+</h3>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Dark Stores</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-4xl font-black text-gray-900 italic">12m</h3>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Avg Delivery</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-4xl font-black text-gray-900 italic">4.9/5</h3>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">App Rating</p>
                    </div>
                </div>
            </div>

            {/* Why Us Section */}
            <section id="why-us" className="py-24 max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black tracking-tight">Why Pazhamuthir Ultra?</h2>
                    <p className="text-gray-500 mt-4">Setting a new standard for grocery shipping.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="feature-card p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm">
                        <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-2xl mb-8">
                            <i className="fa-solid fa-shield-check"></i>
                        </div>
                        <h4 className="text-xl font-black mb-4">Escrow Payments</h4>
                        <p className="text-gray-500 leading-relaxed">Your money is held securely and only released to the store once you confirm the quality of your delivered items.</p>
                    </div>
                    <div className="feature-card p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm">
                        <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-8">
                            <i className="fa-solid fa-truck-fast"></i>
                        </div>
                        <h4 className="text-xl font-black mb-4">10 Min Shipping</h4>
                        <p className="text-gray-500 leading-relaxed">Our local dark-store network ensures your groceries are picked, packed, and shipped within 10 minutes of ordering.</p>
                    </div>
                    <div className="feature-card p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm">
                        <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-2xl mb-8">
                            <i className="fa-solid fa-hand-holding-heart"></i>
                        </div>
                        <h4 className="text-xl font-black mb-4">Direct from Farm</h4>
                        <p className="text-gray-500 leading-relaxed">We eliminate the middlemen. Get fruits and vegetables harvested today, delivered today. Guaranteed fresh.</p>
                    </div>
                </div>
            </section>

            {/* Login Modal */}
            {isModalOpen && (
                <div id="login-modal" className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl">
                        <div className="md:w-1/2 relative min-h-[300px]">
                            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800"
                                className="absolute inset-0 w-full h-full object-cover" alt="login-visual"/>
                            <div className="absolute inset-0 bg-green-900/40 flex flex-col justify-end p-10 text-white">
                                <h2 className="text-4xl font-black mb-2 leading-none">Freshness <br/>at your door.</h2>
                                <p className="opacity-80 font-medium">Join 2 Million+ happy customers.</p>
                            </div>
                        </div>
                        <div className="md:w-1/2 p-10 flex flex-col justify-center bg-white">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-3xl font-black">Login</h3>
                                <button onClick={toggleModal} className="text-2xl text-gray-300 hover:text-black">&times;</button>
                            </div>
                            <div className="text-gray-500 mb-6 text-[11px] bg-gray-50 p-3 rounded-xl border border-gray-100">
                                <b>Client:</b> abhinavbaskaran8303@gmail.com / Abhinav@8323 <br/>
                                <b>Rider:</b> rider@pazhamuthir.com / Rider@123
                            </div>
                            <form onSubmit={handleLogin} className="space-y-4">
                                <input 
                                    type="email" 
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-gray-50 border-none rounded-xl py-4 px-4 focus:ring-2 focus:ring-green-500 transition-all font-bold"
                                />
                                <input 
                                    type="password" 
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-gray-50 border-none rounded-xl py-4 px-4 focus:ring-2 focus:ring-green-500 transition-all font-bold"
                                />
                                <button type="submit"
                                    className="w-full bg-green-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-green-100 hover:bg-green-700 mt-4 transition-all active:scale-95">
                                    Sign In
                                </button>
                                <div className="flex justify-between text-xs font-bold text-gray-400 px-2 mt-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 accent-green-600 rounded"/>
                                        <span>Remember me</span>
                                    </label>
                                    <a href="#" className="text-green-600 hover:underline">Forgot Password?</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Landing;