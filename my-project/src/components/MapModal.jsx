import React from 'react';

const MapModal = ({ isOpen, onClose, onSelect }) => {
    if (!isOpen) return null;

    return (
        <div id="map-modal" className="fixed inset-0 bg-black/70 z-[200] flex items-center justify-center p-4 backdrop-blur-md">
            <div className="bg-white w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-xl font-black text-gray-800">Select Delivery Location</h3>
                    <button onClick={onClose} className="text-gray-400 text-2xl">&times;</button>
                </div>

                <div className="h-52 bg-gray-100 relative flex items-center justify-center">
                    <img src="https://api.maptiler.com/maps/basic/static/77.5946,12.9716,12/400x300.png" className="w-full h-full object-cover opacity-40 grayscale" alt="map"/>
                    <div className="absolute flex flex-col items-center">
                        <i className="fa-solid fa-location-dot text-red-500 text-4xl animate-bounce"></i>
                        <div className="bg-white px-3 py-1 rounded-lg shadow-xl text-[10px] font-bold mt-2">PIN YOUR HOME</div>
                    </div>
                </div>

                <div className="p-6 space-y-3">
                    <button onClick={() => { onSelect('HSR Layout, Sector 7'); onClose(); }} className="w-full flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-green-500 hover:bg-green-50 group">
                        <i className="fa-solid fa-house text-gray-400 group-hover:text-green-600"></i>
                        <div className="text-left">
                            <p className="font-bold text-sm">HSR Layout</p>
                            <p className="text-[10px] text-gray-500">Sector 7, Bangalore</p>
                        </div>
                    </button>
                    <button onClick={() => { onSelect('Indiranagar, 100ft Rd'); onClose(); }} className="w-full flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-green-500 hover:bg-green-50 group">
                        <i className="fa-solid fa-briefcase text-gray-400 group-hover:text-green-600"></i>
                        <div className="text-left">
                            <p className="font-bold text-sm">Indiranagar</p>
                            <p className="text-[10px] text-gray-500">100ft Road, Bangalore</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MapModal;