import React from 'react';

const ProfileDrawer = ({ isOpen, onClose }) => {
    return (
        <div id="profile-drawer" className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[100] shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-black">My Account</h3>
                    <button onClick={onClose} className="text-3xl text-gray-300">&times;</button>
                </div>

                <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-3xl border border-gray-100">
                    <div className="w-16 h-16 bg-[#5C1B95] text-white rounded-full flex items-center justify-center text-xl font-black">AB</div>
                    <div>
                        <h4 className="text-lg font-black">Abhinav Baskaran</h4>
                        <p className="text-sm text-gray-500">+91 8778948004</p>
                        <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-md">VERIFIED</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="bg-purple-50 p-4 rounded-2xl">
                        <p className="text-[10px] font-black text-purple-400 uppercase leading-none mb-1">Total Savings</p>
                        <p className="text-xl font-black text-[#5C1B95]">₹1,240</p>
                    </div>
                    <div className="bg-pink-50 p-4 rounded-2xl">
                        <p className="text-[10px] font-black text-pink-400 uppercase leading-none mb-1">Orders</p>
                        <p className="text-xl font-black text-pink-600">42</p>
                    </div>
                </div>

                <div className="space-y-2">
                    {['Order History', 'Saved Addresses', 'Refunds & Wallet', 'Help & Support'].map((opt, i) => (
                        <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl cursor-pointer">
                            <div className="flex items-center gap-4">
                                <i className={`fa-solid ${i === 0 ? 'fa-clock-rotate-left' : i === 1 ? 'fa-location-dot' : i === 2 ? 'fa-wallet' : 'fa-headset'} text-gray-400`}></i>
                                <span className="font-bold">{opt}</span>
                            </div>
                            <i className="fa-solid fa-chevron-right text-xs text-gray-300"></i>
                        </div>
                    ))}
                </div>

                <button onClick={() => { alert("Logging Out..."); onClose(); }} className="w-full mt-10 text-red-500 font-black text-sm p-4 border-t border-gray-100 text-left">
                    <i className="fa-solid fa-power-off mr-2"></i> Log Out
                </button>
            </div>
        </div>
    );
};

export default ProfileDrawer;