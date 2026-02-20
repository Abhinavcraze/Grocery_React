import React, { useState } from 'react';

const CartModal = ({ isOpen, onClose, cart, removeFromCart, onCheckout }) => {
    const [payment, setPayment] = useState('UPI');
    const [slot, setSlot] = useState('Instant (10-15 Mins)');

    if (!isOpen) return null;

    return (
        <div id="cart-modal" className="fixed inset-0 bg-black/70 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 backdrop-blur-sm">
            <div className="bg-white w-full max-w-lg rounded-t-[2.5rem] md:rounded-[2.5rem] p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-black">Your Basket</h3>
                    <button onClick={onClose} className="text-3xl text-gray-300">&times;</button>
                </div>

                <div id="cart-items-list" className="space-y-4 mb-8">
                    {cart.length === 0 ? (
                        <p className="text-center text-gray-400 py-10 font-bold">Your cart is empty</p>
                    ) : (
                        cart.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl">
                                <img src={item.img} className="w-12 h-12 rounded-xl object-cover" alt={item.name}/>
                                <div className="flex-1">
                                    <h5 className="font-bold text-sm">{item.name}</h5>
                                    <p className="text-xs font-black text-green-600">₹{item.price}</p>
                                </div>
                                <button onClick={() => removeFromCart(idx)} className="text-gray-300 hover:text-red-500 p-2">
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="border-t pt-6">
                    <h4 className="font-black text-sm uppercase tracking-widest text-gray-400 mb-4">Select Payment Method</h4>
                    <div className="grid grid-cols-1 gap-3">
                        {['UPI', 'Card', 'COD'].map(method => (
                            <label key={method} className={`flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all ${payment === method ? 'border-green-500 bg-green-50' : ''}`}>
                                <input type="radio" name="payment" value={method} checked={payment === method} onChange={() => setPayment(method)} className="accent-green-600"/>
                                <div className="flex-1"><p className="font-bold text-sm">{method === 'UPI' ? 'UPI (GPay, PhonePe)' : method === 'Card' ? 'Debit / Credit Card' : 'Cash on Delivery'}</p></div>
                                <i className={`fa-solid ${method === 'UPI' ? 'fa-mobile-screen-button' : method === 'Card' ? 'fa-credit-card' : 'fa-hand-holding-dollar'} text-gray-400`}></i>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mb-8 mt-8">
                    <h4 className="font-black text-sm uppercase tracking-widest text-gray-400 mb-4">Choose Delivery Slot</h4>
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                        {['INSTANT', 'EVENING', 'TOMORROW'].map(s => (
                            <label key={s} className="cursor-pointer flex-shrink-0">
                                <input type="radio" name="slot" checked={slot.includes(s)} onChange={() => setSlot(s)} className="hidden peer"/>
                                <div className="px-6 py-4 rounded-2xl border-2 border-gray-100 peer-checked:border-green-600 peer-checked:bg-green-50 text-center">
                                    <p className="font-black text-xs">{s}</p>
                                    <p className="text-[10px] text-gray-500">{s === 'INSTANT' ? '10-15 Mins' : s === 'EVENING' ? '6 PM - 8 PM' : '7 AM - 9 AM'}</p>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <button onClick={onCheckout} className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg mt-8">Place Order</button>
            </div>
        </div>
    );
};

export default CartModal;