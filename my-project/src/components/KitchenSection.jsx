import React, { useState } from 'react';
import { products, kitchenRecipes } from '../data/products';

const KitchenSection = ({ addToCart, onClose }) => {
    const [activeIdx, setActiveIdx] = useState(0);
    const [btnState, setBtnState] = useState('idle'); // idle, adding, success

    const recipe = kitchenRecipes[activeIdx];
    
    // Calculate bundle total
    const bundleTotal = recipe.items.reduce((sum, id) => {
        const p = products.find(prod => prod.id === id);
        return sum + (p ? p.variants[0].p : 0);
    }, 0);

    const handleAddKit = () => {
        setBtnState('adding');
        
        // Add all items to cart
        recipe.items.forEach(id => {
            const p = products.find(prod => prod.id === id);
            if (p) addToCart(p, p.variants[0].p);
        });

        setTimeout(() => {
            setBtnState('success');
            setTimeout(() => setBtnState('idle'), 2000);
        }, 1000);
    };

    return (
        <section id="kitchen-hub" className="max-w-7xl mx-auto px-4 mt-6 animate-in slide-in-from-top duration-700">
            <div className="bg-gray-900 rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/5 relative">
                
                {/* Header / Tabs */}
                <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-4">
                    <div className="flex overflow-x-auto no-scrollbar">
                        {kitchenRecipes.map((r, idx) => (
                            <button 
                                key={idx}
                                onClick={() => setActiveIdx(idx)}
                                className={`py-6 px-8 font-black text-xs uppercase tracking-widest border-b-4 whitespace-nowrap transition-all ${activeIdx === idx ? 'text-white border-green-500' : 'text-gray-500 border-transparent hover:text-white'}`}
                            >
                                {r.title}
                            </button>
                        ))}
                    </div>
                    <button onClick={onClose} className="text-white/30 hover:text-white px-6">
                        <i className="fa-solid fa-circle-xmark text-2xl"></i>
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row h-auto lg:h-[550px]">
                    {/* Video Player */}
                    <div className="lg:w-7/12 relative bg-black h-[300px] lg:h-full">
                        <video 
                            key={recipe.video} 
                            className="w-full h-full object-cover opacity-70" 
                            autoplay muted loop playsinline 
                            src={recipe.video}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-10 left-10 text-white">
                            <h2 className="text-4xl font-black mb-1">{recipe.title}</h2>
                            <p className="text-green-400 font-bold uppercase text-[10px] tracking-widest italic">{recipe.desc}</p>
                        </div>
                    </div>

                    {/* Ingredients List */}
                    <div className="lg:w-5/12 bg-white p-10 flex flex-col">
                        <h4 className="font-black text-gray-400 text-[10px] uppercase tracking-widest mb-6">Ingredients for this recipe</h4>
                        <div className="flex-1 space-y-3 overflow-y-auto no-scrollbar mb-8">
                            {recipe.items.map(id => {
                                const p = products.find(prod => prod.id === id);
                                return (
                                    <div key={id} className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                        <div className="flex items-center gap-4">
                                            <img src={p.img} className="w-10 h-10 rounded-lg object-cover bg-white" alt={p.name}/>
                                            <div>
                                                <p className="font-bold text-gray-800 text-sm leading-none mb-1">{p.name}</p>
                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{p.variants[0].q}</p>
                                            </div>
                                        </div>
                                        <span className="font-black text-gray-900 text-sm">₹{p.variants[0].p}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-auto pt-6 border-t">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-400 font-bold text-xs">BUNDLE PRICE</span>
                                <span className="text-2xl font-black text-gray-900 tracking-tighter">₹{bundleTotal}</span>
                            </div>
                            <button 
                                onClick={handleAddKit}
                                className={`w-full py-5 rounded-[2rem] font-black text-lg shadow-xl transition-all flex items-center justify-center gap-3 ${btnState === 'success' ? 'bg-black text-white' : 'bg-green-600 text-white hover:bg-green-700'}`}
                            >
                                {btnState === 'idle' && <>ADD ALL INGREDIENTS <i className="fa-solid fa-cart-plus"></i></>}
                                {btnState === 'adding' && <><i className="fa-solid fa-circle-notch animate-spin"></i> ADDING KIT...</>}
                                {btnState === 'success' && <><i className="fa-solid fa-check"></i> KIT ADDED TO CART</>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default KitchenSection;