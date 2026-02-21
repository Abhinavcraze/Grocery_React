import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Groceries.css';
import { products } from '../data/products';

// Sub-components
import SmartReorder from '../components/SmartReorder';
import KitchenSection from '../components/KitchenSection';
import FlashSale from '../components/FlashSale';
import CartModal from '../components/CartModal';
import MapModal from '../components/MapModal';
import ProfileDrawer from '../components/ProfileDrawer';

const Store = () => {
    const navigate = useNavigate();
    
    // --- State Management ---
    const [cart, setCart] = useState([]);
    const [currentCat, setCurrentCat] = useState('All');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isKitchenOpen, setIsKitchenOpen] = useState(false);
    const [address, setAddress] = useState(localStorage.getItem('userLocation') || 'Select Location');
    const [walletBalance, setWalletBalance] = useState(parseFloat(localStorage.getItem('userWallet')) || 0);

    // --- Calculation Fix ---
    // Calculate total by explicitly converting prices to numbers
    const cartTotal = cart.reduce((sum, item) => sum + Number(item.price), 0);

    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        setQuery(e.target.value);
    };

    
    // --- Logic ---
    const addToCart = (product, selectedPrice) => {
        // Use the selected variant price or the default price
        const priceToUse = selectedPrice || (product.variants ? product.variants[0].p : product.price);
        
        const newCartItem = {
            id: Date.now() + Math.random(),
            productId: product.id || product.productId,
            name: product.name,
            price: priceToUse,
            img: product.img
        };

        // Functional update pattern: This is the fix for adding "All Ingredients"
        setCart(prevCart => [...prevCart, newCartItem]);
    };

    const removeFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    const processCheckout = () => {
        if (cart.length === 0) return alert("Add items to cart first!");
        localStorage.setItem('purchasedItems', JSON.stringify(cart));
        localStorage.setItem('orderTotal', `₹${cartTotal}`);
        navigate('/tracking');
    };

    return (
        <div className="bg-gray-50 text-gray-900 font-['Outfit'] min-h-screen">
            {/* Header */}
            <header className="glass-header sticky top-0 z-50 border-b border-gray-100 px-4 py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="bg-green-600 p-2 rounded-xl text-white"><i className="fa-solid fa-leaf text-xl"></i></div>
                            <h1 className="text-2xl font-black text-green-800 tracking-tighter">PAZHAMUTHIR</h1>
                        </div>
                        <div onClick={() => setIsMapOpen(true)} className="flex flex-col cursor-pointer border-l pl-6 border-gray-200">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Deliver to</span>
                            <span className="text-sm font-semibold flex items-center gap-1">
                                <i className="fa-solid fa-location-dot text-red-500"></i>
                                <span>{address}</span>
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 max-w-xl mx-10 hidden md:block relative">
                        <input
                            type="text"
                            placeholder="Search 5000+ products..."
                            value={query}
                            onChange={handleSearch}
                            className="w-full bg-gray-100 border-none rounded-2xl py-3 px-12 focus:ring-2 focus:ring-green-500 focus:bg-white transition-all outline-none"
                        />
                    <i className="fa-solid fa-magnifying-glass absolute left-4 top-4 text-gray-400"></i>
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsProfileOpen(true)} className="flex-shrink-0 active:scale-90 transition-transform">
                            <div className="w-10 h-10 bg-[#5C1B95] text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-purple-100 shadow-sm">AB</div>
                        </button>
                        <div className="flex items-center bg-gradient-to-r from-green-600 to-green-700 px-3 py-1.5 rounded-xl text-white shadow-sm border border-green-500/30">
                            <div className="flex flex-col mr-3 border-r border-white/20 pr-3 leading-tight">
                                <span className="text-[8px] font-black uppercase opacity-80 tracking-tighter">Wallet</span>
                                <span className="text-sm font-black italic">₹{walletBalance.toFixed(2)}</span>
                            </div>
                            <button onClick={() => setWalletBalance(prev => prev + 100)} className="w-6 h-6 bg-white text-green-700 rounded-lg flex items-center justify-center hover:bg-green-50 transition-colors shadow-sm active:scale-95">
                                <i className="fa-solid fa-plus text-[10px]"></i>
                            </button>
                        </div>
                        <button onClick={() => setIsCartOpen(true)} className="bg-green-600 text-white px-4 py-2.5 rounded-xl font-black text-sm shadow-md flex items-center gap-2 hover:bg-green-700 transition-all active:scale-95">
                            <i className="fa-solid fa-cart-shopping text-xs"></i>
                            <span className="bg-white/20 px-1.5 rounded-md min-w-[18px]">{cart.length}</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="zepto-gradient text-white text-[11px] font-bold py-1.5 text-center tracking-widest uppercase">
                <i className="fa-solid fa-bolt-lightning text-yellow-400 mr-2"></i> Free Delivery on orders above ₹99 with <span className="text-yellow-400">MART PASS</span>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-8 pb-32">
                <SmartReorder addToCart={addToCart} />

                {/* Kitchen Hub Toggle */}
                <div className="mt-8">
                    <button onClick={() => setIsKitchenOpen(!isKitchenOpen)} className="w-full bg-gradient-to-r from-green-700 to-green-900 rounded-[2.5rem] p-6 text-white flex items-center justify-between shadow-xl hover:scale-[1.01] transition-all group">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform">
                                <i className="fa-solid fa-kitchen-set text-green-400"></i>
                            </div>
                            <div className="text-left">
                                <h3 className="text-2xl font-black italic tracking-tighter">PAZHAMUTHIR <span className="text-green-400">KITCHEN</span></h3>
                                <p className="text-xs font-bold opacity-70 uppercase tracking-widest">Get recipes & ingredients in 1-click</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-2xl font-black text-sm uppercase">Explore <i className={`fa-solid ${isKitchenOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i></div>
                    </button>
                </div>

                {isKitchenOpen && <KitchenSection addToCart={addToCart} />}

                <FlashSale addToCart={addToCart} />

                {/* Category Filters */}
                <div className="bg-white border-b border-gray-100 sticky top-[73px] z-40 py-4 mb-8 flex gap-3 overflow-x-auto no-scrollbar">
                    {['All', 'Fresh Produce', 'Dairy', 'Bakery', 'Pantry', 'Meat', 'Snacks', 'Frozen', 'Household'].map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setCurrentCat(cat)}
                            className={`category-pill border px-6 py-2 rounded-full whitespace-nowrap font-bold text-sm transition-all ${currentCat === cat ? 'active bg-green-600 text-white' : 'bg-white'}`}
                        >
                            {cat === 'Fresh Produce' ? 'Fruits & Veggies' : cat === 'Dairy' ? 'Dairy & Eggs' : cat}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div id="product-container" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {products.filter(p => currentCat === 'All' || p.cat === currentCat).map(p => (
                        <ProductCard key={p.id} product={p} onAdd={addToCart} />
                    ))}
                </div>
            </main>

            <Footer />

            {/* Footer Cart Bar - Dynamic Totals */}
            {cart.length > 0 && (
                <div id="cart-footer" className="fixed bottom-0 w-full bg-white border-t border-gray-100 p-4 z-50 shadow-2xl animate-in slide-in-from-bottom">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="bg-green-100 text-green-600 p-3 rounded-xl"><i className="fa-solid fa-bag-shopping"></i></div>
                            <div>
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{cart.length} ITEMS</p>
                                <p className="text-lg font-black text-gray-900">₹{cartTotal.toFixed(2)}</p>
                            </div>
                        </div>
                        <button onClick={() => setIsCartOpen(true)} className="bg-green-600 text-white px-10 py-4 rounded-2xl font-black text-sm transition-transform active:scale-95">VIEW CART <i className="fa-solid fa-chevron-right text-[10px]"></i></button>
                    </div>
                </div>
            )}

            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} removeFromCart={removeFromCart} onCheckout={processCheckout} />
            <MapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} onSelect={(loc) => setAddress(loc)} />
            <ProfileDrawer isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        </div>
    );
};

const ProductCard = ({ product, onAdd }) => {
    const [selectedPrice, setSelectedPrice] = useState(product.variants[0].p);
    return (
        <div className="product-card bg-white p-4 rounded-[2rem] border border-gray-100 flex flex-col group h-full transition-all">
            <div className="relative overflow-hidden rounded-2xl mb-4">
                <img src={product.img} className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500" alt={product.name}/>
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-black text-green-700">★ {product.rating}</div>
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{product.cat}</p>
            <h4 className="font-bold text-gray-800 text-sm leading-tight mb-3 h-10 overflow-hidden">{product.name}</h4>
            <select onChange={(e) => setSelectedPrice(parseInt(e.target.value))} className="text-xs bg-gray-50 border-none rounded-xl p-2.5 mb-4 focus:ring-1 focus:ring-green-500 outline-none">
                {product.variants.map((v, i) => <option key={i} value={v.p}>{v.q} - ₹{v.p}</option>)}
            </select>
            <div className="mt-auto flex justify-between items-center">
                <span className="text-lg font-black text-gray-900">₹{selectedPrice}</span>
                <button onClick={() => onAdd(product, selectedPrice)} className="bg-green-600 text-white px-5 py-2 rounded-xl font-bold text-xs shadow-lg shadow-green-100 active:scale-95 transition-all">ADD</button>
            </div>
        </div>
    );
};

const Footer = () => (
    <footer className="bg-white border-t border-gray-200 mt-20 pt-16 pb-10 px-4">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-gray-100 pb-16">
                <div className="md:col-span-4">
                    <h4 className="font-bold text-gray-900 mb-6 text-lg">Useful Links</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-500 text-left">
                        <ul className="space-y-3"><li>Blog</li><li>Privacy</li><li>Terms</li></ul>
                        <ul className="space-y-3"><li>FAQs</li><li>Security</li><li>Contact</li></ul>
                        <ul className="space-y-3"><li>Partner</li><li>Franchise</li><li>Deliver</li></ul>
                    </div>
                </div>
                <div className="md:col-span-8">
                    <h4 className="font-bold text-gray-900 text-lg mb-6 text-left">Categories <span className="text-green-600 text-sm ml-2 cursor-pointer">see all</span></h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 text-sm text-gray-500 text-left">
                        <ul className="space-y-2"><li>Fruits & Veggies</li><li>Dairy & Eggs</li></ul>
                        <ul className="space-y-2"><li>Pantry Staples</li><li>Meat & Seafood</li></ul>
                        <ul className="space-y-2"><li>Frozen Foods</li><li>Household</li></ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);

export default Store;