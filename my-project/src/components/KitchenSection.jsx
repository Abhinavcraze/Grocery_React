import React, { useState } from 'react';
import { products, kitchenRecipes } from '../data/products';

const KitchenSection = ({ addToCart }) => {
    const [activeIdx, setActiveIdx] = useState(0);
    const recipe = kitchenRecipes[activeIdx];

    // FIX: Calculate total bundle price based on current default variant price
    const bundlePrice = recipe.items.reduce((sum, id) => {
        const product = products.find(p => p.id === id);
        return sum + (product ? product.variants[0].p : 0);
    }, 0);

    const handleAddAll = () => {
        recipe.items.forEach(id => {
            const product = products.find(p => p.id === id);
            if (product) {
                // Add the specific item with its default variant price
                addToCart(product, product.variants[0].p);
            }
        });
    };

    return (
        <div className="mt-6 animate-in slide-in-from-top duration-500 bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-gray-100 flex flex-col items-center">
            {/* Dark Header */}
            <div className="w-full bg-black text-white p-12 text-left relative">
                <h2 className="text-6xl font-black tracking-tighter mb-2">{recipe.title}</h2>
                <p className="text-green-400 font-bold uppercase tracking-widest text-xs italic">{recipe.desc}</p>
            </div>

            <div className="w-full p-10 bg-white">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Ingredients for this recipe</h4>
                
                {/* Dynamic Ingredients List */}
                <div className="space-y-4 mb-10">
                    {recipe.items.map(id => {
                        const p = products.find(prod => prod.id === id);
                        if (!p) return null;
                        return (
                            <div key={id} className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                <div className="flex items-center gap-4">
                                    <img src={p.img} className="w-12 h-12 rounded-xl object-cover" alt={p.name} />
                                    <div className="text-left">
                                        <p className="font-bold text-gray-800 text-sm leading-tight mb-1">{p.name}</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase">{p.variants[0].q}</p>
                                    </div>
                                </div>
                                <span className="font-black text-gray-900">₹{p.variants[0].p}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Footer and Action */}
                <div className="border-t pt-8">
                    <div className="flex justify-between items-center mb-8">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Bundle Price</span>
                        <span className="text-4xl font-black text-gray-900 tracking-tighter">₹{bundlePrice}</span>
                    </div>
                    <button 
                        onClick={handleAddAll}
                        className="w-full bg-green-600 text-white py-6 rounded-[2.5rem] font-black text-xl shadow-xl shadow-green-100 hover:bg-green-700 active:scale-95 transition-all flex items-center justify-center gap-4"
                    >
                        ADD ALL INGREDIENTS <i className="fa-solid fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default KitchenSection;